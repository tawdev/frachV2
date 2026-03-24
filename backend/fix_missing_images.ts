import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const IMAGES_DIR = path.join(__dirname, '../frontend/public/images');

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
    const products = await prisma.product.findMany({ select: { id: true, image: true } });
    console.log(`Checking ${products.length} products...`);

    for (const p of products) {
      if (!p.image || p.image.startsWith('http')) continue;
      
      const filePath = path.join(__dirname, '../frontend/public', p.image);
      if (!fs.existsSync(filePath)) {
        console.log(`Missing: Product ${p.id} uses ${p.image} (NOT FOUND)`);
        await prisma.product.update({ 
          where: { id: p.id }, 
          data: { image: 'images/placeholder.jpg' } 
        });
      }
    }

    // Also check Categories etc. if you want, but products are the main concern.
    const categories = await prisma.category.findMany({ select: { id: true, image: true } });
    for (const c of categories) {
      if (!c.image || c.image.startsWith('http')) continue;
      const filePath = path.join(__dirname, '../frontend/public', c.image);
      if (!fs.existsSync(filePath)) {
        console.log(`Missing: Category ${c.id} uses ${c.image} (NOT FOUND)`);
        await prisma.category.update({ 
          where: { id: c.id }, 
          data: { image: 'images/placeholder.jpg' } 
        });
      }
    }

    console.log('\nPlaceholder update complete!');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
