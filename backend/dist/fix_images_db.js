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
const path = __importStar(require("path"));
require("dotenv/config");
function slugify(filename) {
    if (filename.startsWith('http'))
        return filename;
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
    const prisma = new client_1.PrismaClient();
    try {
        console.log('Starting Database Image Path Update...');
        const products = await prisma.product.findMany({ select: { id: true, image: true } });
        for (const p of products) {
            if (!p.image)
                continue;
            const basename = path.basename(p.image);
            const newBasename = slugify(basename);
            if (basename !== newBasename) {
                const newPath = p.image.replace(basename, newBasename);
                await prisma.product.update({ where: { id: p.id }, data: { image: newPath } });
                console.log(`Updated Product ${p.id}: "${p.image}" -> "${newPath}"`);
            }
        }
        const categories = await prisma.category.findMany({ select: { id: true, image: true } });
        for (const c of categories) {
            if (!c.image)
                continue;
            const basename = path.basename(c.image);
            const newBasename = slugify(basename);
            if (basename !== newBasename) {
                const newPath = c.image.replace(basename, newBasename);
                await prisma.category.update({ where: { id: c.id }, data: { image: newPath } });
                console.log(`Updated Category ${c.id}: "${c.image}" -> "${newPath}"`);
            }
        }
        const typesCategories = await prisma.typesCategory.findMany({ select: { id: true, image: true } });
        for (const tc of typesCategories) {
            if (!tc.image)
                continue;
            const basename = path.basename(tc.image);
            const newBasename = slugify(basename);
            if (basename !== newBasename) {
                const newPath = tc.image.replace(basename, newBasename);
                await prisma.typesCategory.update({ where: { id: tc.id }, data: { image: newPath } });
                console.log(`Updated TypesCategory ${tc.id}: "${tc.image}" -> "${newPath}"`);
            }
        }
        const items = await prisma.typesCategoriesItem.findMany({ select: { id: true, image: true } });
        for (const item of items) {
            if (!item.image)
                continue;
            const basename = path.basename(item.image);
            const newBasename = slugify(basename);
            if (basename !== newBasename) {
                const newPath = item.image.replace(basename, newBasename);
                await prisma.typesCategoriesItem.update({ where: { id: item.id }, data: { image: newPath } });
                console.log(`Updated TypesCategoriesItem ${item.id}: "${item.image}" -> "${newPath}"`);
            }
        }
        console.log('\nDatabase update complete!');
    }
    catch (err) {
        console.error('Fatal error:', err);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=fix_images_db.js.map