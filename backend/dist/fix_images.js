"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
require("dotenv/config");
const IMAGES_DIR = path.join(__dirname, '../frontend/public/images');
function slugify(filename) {
    const ext = path.extname(filename);
    const nameWithoutExt = path.basename(filename, ext);
    const slug = nameWithoutExt
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    return `${slug}${ext.toLowerCase()}`;
}
async function main() {
    const url = new URL(process.env.DATABASE_URL);
    const adapter = new adapter_mariadb_1.PrismaMariaDb({
        host: url.hostname,
        port: Number(url.port) || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.substring(1),
    });
    const prisma = new client_1.PrismaClient({ adapter });
    try {
        const files = fs.readdirSync(IMAGES_DIR);
        const renameMap = {};
        console.log(`Processing ${files.length} files in ${IMAGES_DIR}...`);
        for (const file of files) {
            if (fs.statSync(path.join(IMAGES_DIR, file)).isDirectory())
                continue;
            if (file === '.htaccess' || file === 'placeholder.jpg')
                continue;
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
                }
                catch (e) {
                    console.error(`Failed to rename ${file}:`, e);
                }
            }
        }
        console.log('\nUpdating database references...');
        const products = await prisma.product.findMany({ select: { id: true, image: true } });
        for (const p of products) {
            if (!p.image)
                continue;
            const basename = path.basename(p.image);
            if (renameMap[basename]) {
                const newPath = p.image.replace(basename, renameMap[basename]);
                await prisma.product.update({ where: { id: p.id }, data: { image: newPath } });
                console.log(`Updated Product ${p.id}: ${p.image} -> ${newPath}`);
            }
        }
        const categories = await prisma.category.findMany({ select: { id: true, image: true } });
        for (const c of categories) {
            if (!c.image)
                continue;
            const basename = path.basename(c.image);
            if (renameMap[basename]) {
                const newPath = c.image.replace(basename, renameMap[basename]);
                await prisma.category.update({ where: { id: c.id }, data: { image: newPath } });
                console.log(`Updated Category ${c.id}: ${c.image} -> ${newPath}`);
            }
        }
        const typesCategories = await prisma.typesCategory.findMany({ select: { id: true, image: true } });
        for (const tc of typesCategories) {
            if (!tc.image)
                continue;
            const basename = path.basename(tc.image);
            if (renameMap[basename]) {
                const newPath = tc.image.replace(basename, renameMap[basename]);
                await prisma.typesCategory.update({ where: { id: tc.id }, data: { image: newPath } });
                console.log(`Updated TypesCategory ${tc.id}: ${tc.image} -> ${newPath}`);
            }
        }
        const items = await prisma.typesCategoriesItem.findMany({ select: { id: true, image: true } });
        for (const item of items) {
            if (!item.image)
                continue;
            const basename = path.basename(item.image);
            if (renameMap[basename]) {
                const newPath = item.image.replace(basename, renameMap[basename]);
                await prisma.typesCategoriesItem.update({ where: { id: item.id }, data: { image: newPath } });
                console.log(`Updated TypesCategoriesItem ${item.id}: ${item.image} -> ${newPath}`);
            }
        }
        console.log('\nAll done!');
    }
    catch (err) {
        console.error('Fatal error:', err);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=fix_images.js.map