import { createServer, Server, Request, Response } from 'http';
import { response } from '@utils/response';
import { request } from '@utils/request';
import { parse } from 'url';

export const server = ((): Server =>
  createServer(async (req: Request, res: Response): Promise<void> => {
    const { router } = await import('../router/router');

    const { query } = parse(req.url as string, true);

    Reflect.defineProperty(req, 'body', {
      configurable: false,
      enumerable: true,
      value: await request.body.bind(null, req)()
    });

    Reflect.defineProperty(req, 'cookies', {
      configurable: false,
      enumerable: true,
      value: request.cookies.bind(null, req)()
    });

    Reflect.defineProperty(req, 'query', {
      configurable: false,
      enumerable: true,
      get: () => query,
      set: (value: Record<string, unknown>) => value
    });

    Reflect.defineProperty(res, 'json', {
      enumerable: false,
      configurable: false,
      value: response.json.bind(null, res)
    });

    const extractPath = ((): string => {
      const [root, ...routes] = req.url.split('/').filter(x => x);

      const path = `/${root}/${routes.join('/')}`.replace(/[/]$/, '');

      const pattern = /[?|&][a-z]*=[a-z0-9._%+-]*/gi;

      if (pattern.test(path)) {
        const formattedQuery = (() =>
          path.match(pattern).reduce((acc, currentValue) => {
            const [key, value] = currentValue.split('=');
            const formattedKey = key.startsWith('?')
              ? key.split('?').join('')
              : key.split('&').join('');

            acc[formattedKey] = value;

            return acc;
          }, {}))();

        const searchQuery = path.match(pattern);
        const newPath = path.replace(`${searchQuery?.join('')}`, '');

        req.query = { ...formattedQuery };

        return newPath;
      }

      return path;
    })();

    for (const route of [await router]) {
      (route.get(extractPath) || route.get('/404'))(req, res);
    }
  }))();
