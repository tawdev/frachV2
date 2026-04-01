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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
require("dotenv/config");
const IMAGES_DIR = path.join(__dirname, '../frontend/public/images');
async function main() {
    const prisma = new client_1.PrismaClient();
    try {
        const products = await prisma.product.findMany({ select: { id: true, image: true } });
        console.log(`Checking ${products.length} products...`);
        for (const p of products) {
            if (!p.image || p.image.startsWith('http'))
                continue;
            const filePath = path.join(__dirname, '../frontend/public', p.image);
            if (!fs.existsSync(filePath)) {
                console.log(`Missing: Product ${p.id} uses ${p.image} (NOT FOUND)`);
                await prisma.product.update({
                    where: { id: p.id },
                    data: { image: 'images/placeholder.jpg' }
                });
            }
        }
        const categories = await prisma.category.findMany({ select: { id: true, image: true } });
        for (const c of categories) {
            if (!c.image || c.image.startsWith('http'))
                continue;
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
    }
    catch (err) {
        console.error('Error:', err);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=fix_missing_images.js.map