import type { Request, Response } from 'http';

import { Headers } from '@custom/headers';
import { Prisma } from '@service/prisma';
import { User } from '@User';

type AuthUser = Partial<User>;

export const logUser = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const { randomBytes } = await import('crypto');
    const { sign } = await import('jsonwebtoken');
    const { compare } = await import('bcrypt');

    const { email, password }: AuthUser = await req.body;

    const data = { email, password };

    for (const [key, value] of Object.entries(data))
      if (!value) {
        res.writeHead(406, Headers());
        res.json({ msg: `missing ${key}` });
				return;
      }

    const user = await Prisma.user.findUnique({
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

    const token = sign(user, randomBytes(20), {
      expiresIn: 3600
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
