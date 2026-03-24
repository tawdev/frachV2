import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';

async function main() {
  const url = new URL(process.env.DATABASE_URL!);
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port) || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1),
  });
  const prisma = new PrismaClient({ adapter } as any);

  try {
    const products = await prisma.product.findMany({
      select: { id: true, name: true, image: true }
    });
    console.log('Products found:', products.length);
    products.forEach(p => {
      console.log(`- ID: ${p.id}, Image: ${p.image}`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
