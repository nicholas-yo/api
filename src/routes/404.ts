import type { Request, Response } from 'http';
import { Headers } from '@utils/headers';

export const notFound = (_req: Request, res: Response) => {
  res.writeHead(404, Headers());
  res.json({ error: 'Not Found' });
};
