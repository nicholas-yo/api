import type { Request, Response } from 'http';

import { Headers } from '@custom/headers';
import { Prisma } from '@service/prisma';

export const users = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const allUsers = await Prisma.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        createdAt: true
      }
    });

    res.writeHead(200, Headers());
    res.json(allUsers);
  } else {
    res.writeHead(405, Headers());
    res.json({ error: 'Method Not Allowed' });
  }
};
