import type { Request, Response } from 'http';

import { Headers } from '@custom/headers';
import { Prisma } from '@service/prisma';

export const user = async (req: Request, res: Response) => {
  if (req.method === 'PUT') {
    const { id } = req.query;

    if (!id) {
      res.writeHead(406, Headers());
      res.json({ error: 'You need provide an id' });
			return;
    }

    const user = await Prisma.user.findUnique({
      where: {
        id: id as string
      }
    });

    if (!user?.id) {
      res.writeHead(404, Headers());
      res.json({ error: 'This user does not exist' });
			return;
    }

    await Prisma.user.update({
      data: await req.body,
      where: {
        id: id as string
      }
    });

    res.writeHead(200, Headers());
    res.json({ msg: 'User successfully updated' });
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      res.writeHead(406, Headers());
      res.json({ error: 'You need provide an id' });
			return;
    }

    const user = await Prisma.user.findUnique({
      where: {
        id: id as string
      }
    });

    if (!user?.id) {
      res.writeHead(404, Headers());
      res.json({ error: 'This user does not exist' });
      return;
    }

    await Prisma.user.delete({
      where: {
        id: id as string
      }
    });

    res.writeHead(200, Headers());
    res.json({ msg: 'User successfully deleted' });
  } else {
    res.writeHead(405, Headers());
    res.json({ error: 'Method Not Allowed' });
  }
};
