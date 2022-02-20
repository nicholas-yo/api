import { createServer } from 'http';

export default (() => {
  const server = createServer(async (req, res) => {
    const { parse } = await import('url');

    const {
      default: { body, cookies }
    } = await import('../utils/request');
    const {
      default: { json, send }
    } = await import('../utils/response');
    const { default: routes } = await import('../routes/index');

    const query = parse(req.url as string, true).query;

    Object.defineProperty(req, 'body', {
      enumerable: true,
      configurable: false,
      get: () => body(req)
    });

    Object.defineProperty(res, 'send', {
      enumerable: false,
      configurable: false,
      get: () => send.bind(null, res)
    });

    Object.defineProperty(req, 'cookies', {
      configurable: false,
      enumerable: true,
      get: () => cookies.bind(null, req)()
    });

    Object.defineProperty(res, 'json', {
      enumerable: false,
      configurable: false,
      get: () => json.bind(null, res)
    });

    Object.defineProperty(req, 'query', {
      configurable: false,
      enumerable: true,
      get: () => query,
      set: value => value
    });

    const extractPath = (): string => {
      const arrayPath = req.url?.split('/') as string[];

      arrayPath.splice(0, 1);

      const [root, ...routes] = arrayPath;

      const path = `/${root}/${routes.join('/')}`;

      const pattern = /[?][a-z]*=[a-z0-9._%+-]*/i;

      if (path.search(pattern)) {
        const searchQuery = path.match(pattern);
        const breakApart = searchQuery?.join('').split('=');
        const propertyKey = breakApart?.[0].split('?').join('') as string;
        const propertyValue = breakApart?.splice(1, 2).join('');
        const newPath = path.replace(`${searchQuery?.join('')}`, '');

        req.query = {
          [propertyKey]: propertyValue
        };

        return newPath;
      }
      return path;
    };

    for await (const route of [await routes]) {
      (route[extractPath()] || route.notFound)(req, res);
    }
  });

  return server;
})();
