import { createServer } from 'http';

export const server = (() => {
  return createServer(async (req, res) => {
    const { parse } = await import('url');

    const { response } = await import('../utils/response');
    const { request } = await import('../utils/request');
    const { routes } = await import('../routes/index');

    const query = parse(req.url as string, true).query;

    (() => {
      Object.defineProperty(req, 'body', {
        enumerable: true,
        configurable: false,
        get: () => request.body(req)
      });

      Object.defineProperty(res, 'send', {
        enumerable: false,
        configurable: false,
        get: () => response.send.bind(this, res)
      });

      Object.defineProperty(req, 'cookies', {
        configurable: false,
        enumerable: true,
        get: () => request.cookies.bind(this, req)()
      });

      Object.defineProperty(res, 'json', {
        enumerable: false,
        configurable: false,
        get: () => response.json.bind(this, res)
      });

      Object.defineProperty(req, 'query', {
        configurable: false,
        enumerable: true,
        get: () => query,
        set: (value: Record<string, unknown>) => value
      });
    })();

    const extractPath = ((): string => {
      const arrayPath = req.url?.split('/') as string[];

      arrayPath[0] || arrayPath.splice(0, 1);

      const [root, ...routes] = arrayPath;

      const path = `/${root}/${routes.join('/')}`;

      const pattern = /[?|&][a-z]*=[a-z0-9._%+-]*/gi;

      if (pattern.test(path)) {
        const formattedQuery = path
          .match(pattern)
          .reduce((acc, currentValue) => {
            const [key, value] = currentValue.split('=');
            const formattedKey = key.startsWith('?')
              ? key.split('?').join('')
              : key.split('&').join('');

            acc[formattedKey] = value;

            return acc;
          }, {});

        const searchQuery = path.match(pattern);
        const newPath = path.replace(`${searchQuery?.join('')}`, '');

        req.query = { ...formattedQuery };

        return newPath;
      }

      return path;
    })();

    (routes[extractPath] || routes[404])(req, res);
  });
})();
