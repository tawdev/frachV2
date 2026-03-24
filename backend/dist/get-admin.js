"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    let admin = await prisma.admin.findFirst();
    if (!admin) {
        admin = await prisma.admin.create({
            data: {
                username: 'admin',
                password: 'password123',
                email: 'admin@frachdark.com',
            }
        });
        console.log('--- CREATED NEW ADMIN ---');
    }
    else {
        console.log('--- FOUND EXISTING ADMIN ---');
    }
    console.log('Username:', admin.username);
    console.log('Password:', admin.password);
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=get-admin.js.map