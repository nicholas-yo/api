import type { Request, Response } from 'http';

import { Headers } from '@custom/headers';
import { Prisma } from '@service/prisma';
import { User } from '@User';

type RegisterUser = Partial<User>;

export const registerUser = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { email, name, surname, password, confirmPassword }: RegisterUser =
      await req.body;

    const data = { email, name, surname, password };

    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        res.writeHead(406, Headers());
        res.json({ error: `You must provide a ${key}` });
        return;
      }
    }

    if (!/[a-z0-9._%+-]*@[a-z]*.com/i.test(email)) {
      res.writeHead(406, Headers());
      res.json({ msg: 'Invalid email format' });
      return;
    }

    const user = await Prisma.user.findUnique({
      where: {
        email
      }
    });

    if (user?.email) {
      res.writeHead(406, Headers());
      res.json({ error: 'Email already exists, try other' });
      return;
    }

    if (password !== confirmPassword) {
      res.writeHead(406, Headers());
      res.json({ error: 'Password is not equal' });
      return;
    }

    await Prisma.user.create({
      data: {
        email,
        name,
        surname,
        password
      }
    });

    res.writeHead(200, Headers());
    res.json({ msg: 'User created successfully' });
  } else {
    res.writeHead(405, Headers());
    res.json({ error: 'Method Not Allowed' });
  }
};
