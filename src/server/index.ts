import type { Request, Response } from 'http';
import { createServer } from 'http';
import { red } from 'cli-color';
import { parse } from 'url';

import { response } from '@custom/response';
import { request } from '@custom/request';
import { router } from '../router';

const handler = async (req: Request, res: Response) => {
  const { query } = parse(req.url as string, true);

  for (const value of [request]) {
    const [[name, func]] = Object.entries(value);

    Reflect.defineProperty(req, name, {
      enumerable: true,
      get: () => func.bind(null, req)()
    });
  }

  Reflect.defineProperty(req, 'query', {
    enumerable: true,
    get: () => query,
    set: (value: Record<string, string>) => value
  });

  Reflect.defineProperty(res, 'json', {
    value: response.json.bind(null, res)
  });

  const extractPath = (() => {
    const [root, ...routes] = req.url.split('/').filter(x => x);

    const path = `/${root}/${routes.join('/')}`.replace(/[/]$/, '');

    const queryPattern = /[?|&][a-z]*=[a-z0-9._%+-]*/gi;

    if (queryPattern.test(path)) {
      const formattedQuery: Record<string, string> = (() =>
        path.match(queryPattern).reduce((acc, currentValue) => {
          const [key, value] = currentValue.split('=');
          const formattedKey = key.substring(1);

          acc[formattedKey] ??= value;

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
    for (const route of [await router]) {
      (route.get(extractPath) ?? route.get('/err/404'))(req, res);
    }
  } catch (error) {
    process.stdout.write(`${red('error')} - ${error.message}\n`);
    (await router).get('/err/500');
  }
};

export const server = createServer(handler);
