import type { Request, Response } from 'http';

import { Headers } from '@utils/headers';
import { Prisma } from '@database/prisma';

const { prisma } = Prisma;

export const user = async (req: Request, res: Response) => {
  if (req.method === 'PUT') {
    const { id } = req.query;

    if (!id) {
      res.writeHead(406, Headers());
      res.json({ error: 'You need provide an id' });
      return;
    }

    const data = JSON.parse(req.body);

    if (!data) {
      res.writeHead(406, Headers());
      res.json({ error: 'require data' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id as string
      }
    });

    if (!user?.id) {
      res.writeHead(404, Headers());
      res.json({ error: 'This user does not exist' });
      return;
    }

    const updatedUserData = await prisma.user.update({
      data,
      where: {
        id: id as string
      }
    });

    res.writeHead(200, Headers());
    res.json(updatedUserData);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      res.writeHead(406, Headers());
      res.json({ error: 'You need provide an id' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id as string
      }
    });

    if (!user?.id) {
      res.writeHead(404, Headers());
      res.json({ error: 'This user does not exist' });
      return;
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: id as string
      }
    });

    res.writeHead(200, Headers());
    res.json(deletedUser);
  } else {
    res.writeHead(405, Headers());
    res.json({ error: 'Method Not Allowed' });
  }
};
