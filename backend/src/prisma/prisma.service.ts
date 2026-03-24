import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import mariadb from 'mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Parse DATABASE_URL if possible, or use individual env vars
    // For now, we know the format from .env: mysql://root:@localhost:3306/meubles_db
    const url = new URL(process.env.DATABASE_URL!);
    const adapter = new PrismaMariaDb({
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.substring(1),
    });
    super({ adapter } as any);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
