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
      if (item === 'categories' || item === 'items' || item === 'types') {
          copyAndSlugify(srcPath, path.join(dest, slugify(item)));
      } else {
          copyAndSlugify(srcPath, path.join(dest, slugify(item)));
      }
    } else {
      if (item === '.htaccess') continue;
      const newName = slugify(item);
      const destPath = path.join(dest, newName);
      
      console.log(`Copying: ${item} -> ${newName}`);
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Starting copy and slugify process...');
copyAndSlugify(srcDir, destDir);
console.log('Done.');
