import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  } else {
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
