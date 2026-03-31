import 'dotenv/config';
import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService implements OnModuleInit, OnModuleDestroy {
    readonly client: PrismaClient;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
