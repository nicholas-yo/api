import type { Request, Response } from 'http';
import { basename, dirname, join } from 'path';
import { hash, genSalt } from 'bcrypt';

import Prisma from '@database/prisma';
import { Headers } from '@utils/headers';

interface User {
  email: string;
  password: string;
}

interface RegisterUser extends User {
  name: string;
  confirmPassword: string;
}

export const registerUser = (() => {
  const { prisma } = Prisma;

  const root = dirname(join(__filename, './'))
    .split('/')
    .splice(6, 2)
    .join('/');
  const route = basename(join(__filename, './'))
    .split('.')
    .splice(0, 1)
    .join('');

  return {
    [`/${root}/${route}`]: async (req: Request, res: Response) => {
      if (req.method === 'POST') {
        const { email, name, password, confirmPassword }: RegisterUser =
          await req.body;

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (!email) {
          res.writeHead(406, Headers());
          res.json({ error: 'You must provide a email' });
          return;
        }

        if (!/[a-z0-9._%+-]*@[a-z]*.com/i.test(email)) {
          res.writeHead(406, Headers());
          res.json({ msg: 'Invalid email format' });
          return;
        }

        if (user?.email) {
          res.writeHead(406, Headers());
          res.json({ error: 'Email already exists, try other' });
          return;
        }

        if (!name) {
          res.writeHead(406, Headers());
          res.json({ error: 'You must provide a name' });
          return;
        }

        if (password !== confirmPassword) {
          res.writeHead(406, Headers());
          res.json({ error: 'Password is not equal' });
          return;
        }

        const salt = await genSalt(10);
        const encryptedPassword = await hash(password, salt);

        const data = {
          email,
          name,
          password: encryptedPassword
        };

        const createdData = await prisma.user.create({
          data
        });

        res.writeHead(200, Headers());
        res.json(createdData);
      } else {
        res.writeHead(405, Headers());
        res.json({ error: 'Method Not Allowed' });
      }
    }
  };
})();
