import type { Request, Response } from 'http';

export const internalServerError = (_req: Request, res: Response) => {
  res.writeHead(500);
  res.end();
};
