import type { Request, Response } from 'http';

import { Prisma } from '@database/prisma';
import { Headers } from '@utils/headers';

const { prisma } = Prisma;

export const users = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
		res.writeHead(200, Headers());
    res.json(await prisma.user.findMany());
  } else {
    res.writeHead(405, Headers());
    res.json({ error: 'Method Not Allowed' });
  }
};
