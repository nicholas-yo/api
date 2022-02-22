import type { Request, Response } from 'http';
import { Headers } from '@utils/headers';
import Prisma from '@database/prisma';
import { basename, join } from 'path';

export const user = (() => {
  const { prisma } = Prisma;

  const root = basename(join(__dirname, './'));
  const route = basename(join(__filename, './'))
    .split('.')
    .splice(0, 1)
    .join('');

  return {
    [`/${root}/${route}`]: async (req: Request, res: Response) => {
      if (req.method === 'PUT') {
        const { id } = req.query;

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

        const { name }: { name: string } = await req.body;

        const updatedUserData = await prisma.user.update({
          select: {
            name: true
          },
          data: {
            name
          },
          where: {
            id: id as string
          }
        });

        res.writeHead(200, Headers());
        res.json(updatedUserData);
      } else if (req.method === 'DELETE') {
        const { id } = req.query;

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

        res.json(deletedUser);
      } else {
        res.writeHead(405, Headers());
        res.json({ error: 'Method Not Allowed' });
      }
    }
  };
})();
