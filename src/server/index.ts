import type { Server, Request, Response } from 'http';
import { response } from '@custom/response';
import { request } from '@custom/request';
import { bold, red } from 'cli-color';
import { createServer } from 'http';
import { stdout } from 'process';

export const server = (async (): Promise<Server> =>
  createServer(async (req: Request, res: Response): Promise<void> => {
    const { router } = await import('../router/router');

    const { parse } = await import('url');

    const { query } = parse(req.url as string, true);

    Reflect.defineProperty(req, 'body', {
      configurable: false,
      enumerable: true,
      value: await request.body.bind(null, req)()
    });

    Reflect.defineProperty(req, 'cookies', {
      configurable: false,
      enumerable: true,
      value: await request.cookies.bind(null, req)()
    });

    Reflect.defineProperty(req, 'query', {
      configurable: false,
      enumerable: true,
      get: () => query,
      set: (value: Record<string, string>) => value
    });

    Reflect.defineProperty(res, 'json', {
      enumerable: false,
      configurable: false,
      value: await response.json.bind(null, res)
    });

    const extractPath = ((): string => {
      const [root, ...routes] = req.url.split('/').filter(x => x);

      const path = `/${root}/${routes.join('/')}`.replace(/[/]$/, '');

      const queryPattern = /[?|&][a-z]*=[a-z0-9._%+-]*/gi;

      if (queryPattern.test(path)) {
        const formattedQuery: Record<string, string> = (() =>
          path.match(queryPattern).reduce((acc, currentValue) => {
            const [key, value] = currentValue.split('=');
            const formattedKey = key.substring(1);

            acc[formattedKey] ||= value;

            return acc;
          }, {}))();

        const searchQuery = path.match(queryPattern);
        const newPath = path.replace(`${searchQuery?.join('')}`, '');

        req.query = { ...formattedQuery };

        return newPath;
      }

      return path;
    })();

    try {
      for await (const route of [await router]) {
        (route.get(extractPath) || route.get('/err/404'))(req, res);
      }
    } catch (error) {
      stdout.write(`${red(bold('error'))} => ${error.message}\n`);
      (await router).get('/err/500');
    }
  }))();
