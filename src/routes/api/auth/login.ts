import type { Request, Response } from 'http';

import { Headers } from '@custom/headers';
import { Prisma } from '@database/prisma';

interface User {
  email: string;
  password: string;
}

type AuthUser = User;

const { prisma } = Prisma;

export const logUser = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const { randomBytes } = await import('crypto');
    const { sign } = await import('jsonwebtoken');
    const { compare } = await import('bcrypt');

    const { email, password }: AuthUser = JSON.parse(req.body);

    if (!email) {
      res.writeHead(406, Headers());
      res.json({ msg: `Require email` });
      return;
    }

    if (!password) {
      res.writeHead(406, Headers());
      res.json({ msg: `Require email` });
      return;
    }

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
};
