import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

export const Prisma = new PrismaClient();

Prisma.$use(async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'create' || params.action === 'update') {
      if (params.args.data.password) {
        const salt = await genSalt(9);
        const encryptedPassword = await hash(params.args.data.password, salt);
				params.args.data.password = encryptedPassword
      }
    }
  }

  return next(params);
});
