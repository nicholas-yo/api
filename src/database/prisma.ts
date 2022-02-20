export default (async () => {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  return {
    prisma
  };
})();
