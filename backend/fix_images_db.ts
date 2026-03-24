import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as path from 'path';
import 'dotenv/config';

function slugify(filename: string): string {
  if (filename.startsWith('http')) return filename;
  const ext = path.extname(filename);
  const nameWithoutExt = path.basename(filename, ext);
  
  const slug = nameWithoutExt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]/g, '-')     // replace non-alphanumeric with -
    .replace(/-+/g, '-')             // remove multiple -
    .replace(/^-|-$/g, '');          // remove leading/trailing -
    
  return `${slug}${ext.toLowerCase()}`;
}

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
    console.log('Starting Database Image Path Update...');

    // 1. Products
    const products = await prisma.product.findMany({ select: { id: true, image: true } });
    for (const p of products) {
      if (!p.image) continue;
      const basename = path.basename(p.image);
      const newBasename = slugify(basename);
      
      if (basename !== newBasename) {
        const newPath = p.image.replace(basename, newBasename);
        await prisma.product.update({ where: { id: p.id }, data: { image: newPath } });
        console.log(`Updated Product ${p.id}: "${p.image}" -> "${newPath}"`);
      }
    }

    // 2. Categories
    const categories = await prisma.category.findMany({ select: { id: true, image: true } });
    for (const c of categories) {
      if (!c.image) continue;
      const basename = path.basename(c.image);
      const newBasename = slugify(basename);
      
      if (basename !== newBasename) {
        const newPath = c.image.replace(basename, newBasename);
        await prisma.category.update({ where: { id: c.id }, data: { image: newPath } });
        console.log(`Updated Category ${c.id}: "${c.image}" -> "${newPath}"`);
      }
    }

    // 3. TypesCategory
    const typesCategories = await prisma.typesCategory.findMany({ select: { id: true, image: true } });
    for (const tc of typesCategories) {
      if (!tc.image) continue;
      const basename = path.basename(tc.image);
      const newBasename = slugify(basename);
      
      if (basename !== newBasename) {
        const newPath = tc.image.replace(basename, newBasename);
        await prisma.typesCategory.update({ where: { id: tc.id }, data: { image: newPath } });
        console.log(`Updated TypesCategory ${tc.id}: "${tc.image}" -> "${newPath}"`);
      }
    }

    // 4. TypesCategoriesItem
    const items = await prisma.typesCategoriesItem.findMany({ select: { id: true, image: true } });
    for (const item of items) {
      if (!item.image) continue;
      const basename = path.basename(item.image);
      const newBasename = slugify(basename);
      
      if (basename !== newBasename) {
        const newPath = item.image.replace(basename, newBasename);
        await prisma.typesCategoriesItem.update({ where: { id: item.id }, data: { image: newPath } });
        console.log(`Updated TypesCategoriesItem ${item.id}: "${item.image}" -> "${newPath}"`);
      }
    }

    console.log('\nDatabase update complete!');

  } catch (err) {
    console.error('Fatal error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
