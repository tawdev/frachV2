import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const IMAGES_DIR = path.join(__dirname, '../frontend/public/images');

async function main() {
  const prisma = new PrismaClient();

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
