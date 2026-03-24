"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
require("dotenv/config");
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