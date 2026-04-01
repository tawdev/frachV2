"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
require("dotenv/config");
async function main() {
    const prisma = new client_1.PrismaClient();
    try {
        const products = await prisma.product.findMany({
            select: { id: true, name: true, image: true }
        });
        console.log('Products found:', products.length);
        products.forEach(p => {
            console.log(`- ID: ${p.id}, Image: ${p.image}`);
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check_product_images.js.map