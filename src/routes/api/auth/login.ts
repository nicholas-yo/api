import type { Request, Response } from 'http';
import { basename, dirname, join } from 'path';
import { compare } from 'bcrypt';

import Prisma from '@database/prisma';
import { Headers } from '@utils/headers';

interface User {
  email: string;
  password: string;
}

type AuthUser = User;

export const logUser = (() => {
  const { prisma } = Prisma;

  const route = (() => {
    return `/${dirname(join(__filename, './'))
      .split('/')
      .splice(6, 2)
      .join('/')
		}/${basename(join(__filename, './'))
      .split('.')
      .splice(0, 1)
      .join('')
		}`;
  })();

  return {
    [`${route}`]: async (req: Request, res: Response) => {
      if (req.method === 'GET') {
        const { randomBytes } = await import('crypto');
        const { sign } = await import('jsonwebtoken');

        const { email, password }: AuthUser = await req.body;

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (!user?.email) {
          res.writeHead(404, Headers());
          res.json({ msg: `User with email ${email} not found` });
          return;
        }

        if (!(await compare(password, user?.password))) {
          res.writeHead(406, Headers());
          res.json({ msg: 'Invalid password' });
          return;
        }

        const token = sign(user, randomBytes(26), {
          expiresIn: '1h'
        });

        const { name } = user;

        const session = {
          user: {
            name,
            email
          },
          token
        };

        res.writeHead(200, Headers());
        res.json(session);
      } else {
        res.writeHead(405, Headers());
        res.json({ error: 'Method Not Allowed' });
      }
    }
  };
})();
