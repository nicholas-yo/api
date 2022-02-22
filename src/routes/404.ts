import type { Request, Response } from 'http';
import { Headers } from '@utils/headers';
import { resolve, basename } from 'path';

export const notFound = (() => {
  const route = basename(resolve(__filename, './'))
    .split('.')
    .splice(0, 1)
    .join('');

  return {
    [route]: (req: Request, res: Response) => {
      if (req.method === 'GET') {
        res.writeHead(404, Headers());
        res.json({ error: 'Not Found' });
      }
    }
  };
})();
