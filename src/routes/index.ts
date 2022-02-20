import type { Request, Response, MethodsTypes } from 'http';
import { compare, hash, genSalt } from 'bcrypt';
import Prisma from '../database/prisma';

type Routes = Record<string, (req: Request, res: Response) => void>;

interface User {
  email: string;
  password: string;
}

interface RegisterUser extends User {
  name: string;
  confirmPassword: string;
}

type AuthUser = User;

export default (async () => {
  const {
    default: { Headers }
  } = await import('../utils/response');

  const { prisma } = Prisma;

  const verifyMethod = (
    method: MethodsTypes,
    ctx: { req: Request; res: Response },
    callback: () => void
  ) => {
    const { req, res } = ctx;

    if (req.method === method) {
      callback();
    } else {
      res.writeHead(405, Headers());
      res.json({ error: 'Method Not Allowed' });
    }
  };

  const routes: Routes = {
    '/api/users': (req: Request, res: Response) => {
      verifyMethod('GET', { req, res }, async () => {
        console.log(req.cookies);

        res.writeHead(200, Headers());
        res.json(await prisma.user.findMany());
      });
    },
    '/api/register/user': (req: Request, res: Response) => {
      verifyMethod('POST', { req, res }, async () => {
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

        if (!email.match(/[a-z0-9._%+-]*@[a-z]*.com/i)) {
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
      });
    },
    '/api/auth/user': (req: Request, res: Response) => {
      verifyMethod('GET', { req, res }, async () => {
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
      });
    },
    '/api/user': async (req: Request, res: Response) => {
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
    },
    notFound: (req: Request, res: Response) => {
      verifyMethod('GET', { req, res }, () => {
        res.writeHead(404, Headers());
        res.json({ error: 'Not Found' });
      });
    }
  };

  return routes;
})();
