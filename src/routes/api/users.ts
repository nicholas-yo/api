import type { Request, Response } from 'http';
import { Headers } from '@utils/headers';
import Prisma from '@database/prisma';
import { basename, join } from 'path';

export const users = (() => {
  const { prisma } = Prisma;

  const root = basename(join(__dirname, './'));
  const route = basename(join(__filename, './'))
    .split('.')
    .splice(0, 1)
    .join('');

  return {
    [`/${root}/${route}`]: async (req: Request, res: Response) => {
      if (req.method === 'GET') {
        res.writeHead(200, Headers());
        res.json(await prisma.user.findMany());
      } else {
        res.writeHead(405, Headers());
        res.json({ error: 'Method Not Allowed' });
      }
    }
  };
})();
