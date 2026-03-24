const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../frontend/public/images');
const destDir = path.join(__dirname, 'uploads/products/images');

function slugify(filename) {
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

function copyAndSlugify(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const isDir = fs.statSync(srcPath).isDirectory();
    
    if (isDir) {
      copyAndSlugify(srcPath, path.join(dest, item)); // keep subdir name as is (e.g. categories, items, types)
    } else {
      if (item === '.htaccess') continue;
      const newName = slugify(item);
      const destPath = path.join(dest, newName);
      
      if (!fs.existsSync(destPath)) {
        console.log(`Copying: ${item} -> ${path.relative(__dirname, destPath)}`);
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

console.log('Starting copy and slugify process...');
copyAndSlugify(srcDir, destDir);
console.log('Done.');
