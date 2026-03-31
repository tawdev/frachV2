import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

function parseDatabaseUrl(url: string) {
  const match = url.match(/mysql:\/\/([^:]+):([^@]*)@([^:]+):(\d+)\/(.+)/);
  if (!match) {
    throw new Error(`Invalid DATABASE_URL format: ${url}`);
  }
  return {
    host: match[3],
    port: parseInt(match[4], 10),
    user: match[1],
    password: decodeURIComponent(match[2]),
    database: match[5],
  };
}

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public readonly client: PrismaClient;

  constructor() {
    const dbUrl = process.env.DATABASE_URL as string;
    const dbConfig = parseDatabaseUrl(dbUrl);

    const adapter = new PrismaMariaDb({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
    });

    this.client = new PrismaClient({ adapter } as any);
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
