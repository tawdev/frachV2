"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
require("dotenv/config");
async function main() {
    const prisma = new client_1.PrismaClient();
    try {
        console.log('Updating Product image paths...');
        const products = await prisma.product.findMany();
        for (const p of products) {
            if (p.image && !p.image.startsWith('http') && !p.image.startsWith('uploads/')) {
                const newPath = `uploads/products/${p.image}`;
                await prisma.product.update({
                    where: { id: p.id },
                    data: { image: newPath }
                });
                console.log(`Updated Product ${p.id}: ${p.image} -> ${newPath}`);
            }
        }
        console.log('Updating Category image paths...');
        const categories = await prisma.category.findMany();
        for (const c of categories) {
            if (c.image && !c.image.startsWith('http') && !c.image.startsWith('uploads/')) {
                const newPath = `uploads/products/${c.image}`;
                await prisma.category.update({
                    where: { id: c.id },
                    data: { image: newPath }
                });
                console.log(`Updated Category ${c.id}: ${c.image} -> ${newPath}`);
            }
        }
        console.log('Database paths updated successfully!');
    }
    catch (err) {
        console.error('Error updating DB:', err);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=fix_image_paths.js.map