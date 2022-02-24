import { PrismaClient } from '@prisma/client';

type PrismaReturnType = { prisma: PrismaClient };

export const Prisma = ((): PrismaReturnType => {
  const prisma = new PrismaClient();

  return {
    prisma
  };
})();
