import type { Request, Response, MethodsTypes } from 'http';

type Routes = Record<string, (req: Request, res: Response) => void>;

type User = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default (async () => {
  const { default: Prisma } = await import('../database/prisma');
  const { prisma } = await Prisma;

  const Headers = async (header?: Record<string, string>) => {
    const defautHeader = { 'Content-Type': 'application/json' };

    if (header) {
      return { ...defautHeader, ...header };
    }

    return defautHeader;
  };

  const verifyMethod = async (
    method: MethodsTypes,
    ctx: { req: Request; res: Response },
    callback: () => void
  ) => {
    const { req, res } = ctx;

    if (req.method === method) {
      callback();
    } else {
      res.writeHead(405, await Headers());
      res.json({ error: 'Method Not Allowed' });
    }
  };

  const routes: Routes = {
    '/api/users': (req: Request, res: Response) => {
      verifyMethod('GET', { req, res }, async () => {
        const { default: cookies } = await import('../utils/cookies');
        const { parseCookies } = await cookies;

        console.log(parseCookies(req.headers.cookies as string));

        res.writeHead(200, await Headers());
        res.json(await prisma.user.findMany());
      });
    },
    '/api/register/user': (req: Request, res: Response) => {
      verifyMethod('POST', { req, res }, async () => {
        const { hash, genSalt } = await import('bcrypt');

        const { email, name, password, confirmPassword }: User = await req.body;

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (!email) {
          res.writeHead(406, await Headers());
          res.json({ error: 'You must provide a email' });
          return;
        }

        if (user?.email) {
          res.writeHead(406, await Headers());
          res.json({ error: 'Email already exists, try other' });
          return;
        }

        if (!name) {
          res.writeHead(406, await Headers());
          res.json({ error: 'You must provide a name' });
          return;
        }

        if (password !== confirmPassword) {
          res.writeHead(406, await Headers());
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

        res.writeHead(200, await Headers());
        res.json(createdData);
      });
    },
    '/api/auth/user': (req: Request, res: Response) => {
      verifyMethod('GET', { req, res }, async () => {
        const { randomBytes } = await import('crypto');
        const { sign } = await import('jsonwebtoken');
        const { compare } = await import('bcrypt');

        const { email, password } = await req.body;

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (!user?.email) {
          res.writeHead(404, await Headers());
          res.json({ msg: `User with email ${email} not found` });
          return;
        }

        if (!(await compare(password, user?.password))) {
          res.writeHead(406, await Headers());
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

        res.writeHead(200, await Headers());
        res.json(session);
      });
    },
    '/api/user': async (req: Request, res: Response) => {
      if (req.method === 'PUT') {
        const { id } = req.query;

        const { name }: { name: User['name'] } = await req.body;

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

        res.writeHead(200, await Headers());
        res.json(updatedUserData);
      } else if (req.method === 'DELETE') {
        const { id } = req.query;

        const deletedUser = await prisma.user.delete({
          where: {
            id: id as string
          }
        });

        res.json(deletedUser);
      } else {
        res.writeHead(405, await Headers());
        res.json({ error: 'Method Not Allowed' });
      }
    },
    notFound: (req: Request, res: Response) => {
      verifyMethod('GET', { req, res }, async () => {
        res.writeHead(404, await Headers());
        res.json({ error: 'Not Found' });
      });
    }
  };

  return routes;
})();
