"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
async function main() {
    const databaseUrl = 'mysql://root:@localhost:3306/meubles_db';
    const url = new URL(databaseUrl);
    const adapter = new adapter_mariadb_1.PrismaMariaDb({
        host: url.hostname,
        port: Number(url.port) || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.substring(1),
    });
    const prisma = new client_1.PrismaClient({ adapter });
    try {
        console.log('Creating product_images table...');
        await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        is_main BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_product_id (product_id),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);
        console.log('Table created successfully!');
    }
    catch (error) {
        console.error('Error creating table:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=fix-db.js.map