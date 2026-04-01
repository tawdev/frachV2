import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

async function main() {
  const prisma = new PrismaClient();

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
