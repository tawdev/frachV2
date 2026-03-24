import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const IMAGES_DIR = path.join(__dirname, '../frontend/public/images');

function slugify(filename: string): string {
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
    const files = fs.readdirSync(IMAGES_DIR);
    const renameMap: Record<string, string> = {};

    console.log(`Processing ${files.length} files in ${IMAGES_DIR}...`);

    for (const file of files) {
      if (fs.statSync(path.join(IMAGES_DIR, file)).isDirectory()) continue;
      if (file === '.htaccess' || file === 'placeholder.jpg') continue;

      const newFile = slugify(file);
      if (file !== newFile) {
        renameMap[file] = newFile;
        const oldPath = path.join(IMAGES_DIR, file);
        const newPath = path.join(IMAGES_DIR, newFile);
        
        if (fs.existsSync(newPath) && file.toLowerCase() !== newFile.toLowerCase()) {
           console.warn(`Warning: ${newFile} already exists. Skipping rename of ${file}.`);
           continue;
        }

        try {
          fs.renameSync(oldPath, newPath);
          console.log(`Renamed: "${file}" -> "${newFile}"`);
        } catch (e) {
          console.error(`Failed to rename ${file}:`, e);
        }
      }
    }

    // Update Database
    console.log('\nUpdating database references...');

    // 1. Products
    const products = await prisma.product.findMany({ select: { id: true, image: true } });
    for (const p of products) {
      if (!p.image) continue;
      const basename = path.basename(p.image);
      if (renameMap[basename]) {
        const newPath = p.image.replace(basename, renameMap[basename]);
        await prisma.product.update({ where: { id: p.id }, data: { image: newPath } });
        console.log(`Updated Product ${p.id}: ${p.image} -> ${newPath}`);
      }
    }

    // 2. Categories
    const categories = await prisma.category.findMany({ select: { id: true, image: true } });
    for (const c of categories) {
      if (!c.image) continue;
      const basename = path.basename(c.image);
      if (renameMap[basename]) {
        const newPath = c.image.replace(basename, renameMap[basename]);
        await prisma.category.update({ where: { id: c.id }, data: { image: newPath } });
        console.log(`Updated Category ${c.id}: ${c.image} -> ${newPath}`);
      }
    }

    // 3. TypesCategory
    const typesCategories = await prisma.typesCategory.findMany({ select: { id: true, image: true } });
    for (const tc of typesCategories) {
      if (!tc.image) continue;
      const basename = path.basename(tc.image);
      if (renameMap[basename]) {
        const newPath = tc.image.replace(basename, renameMap[basename]);
        await prisma.typesCategory.update({ where: { id: tc.id }, data: { image: newPath } });
        console.log(`Updated TypesCategory ${tc.id}: ${tc.image} -> ${newPath}`);
      }
    }

    // 4. TypesCategoriesItem
    const items = await prisma.typesCategoriesItem.findMany({ select: { id: true, image: true } });
    for (const item of items) {
      if (!item.image) continue;
      const basename = path.basename(item.image);
      if (renameMap[basename]) {
        const newPath = item.image.replace(basename, renameMap[basename]);
        await prisma.typesCategoriesItem.update({ where: { id: item.id }, data: { image: newPath } });
        console.log(`Updated TypesCategoriesItem ${item.id}: ${item.image} -> ${newPath}`);
      }
    }

    console.log('\nAll done!');

  } catch (err) {
    console.error('Fatal error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
