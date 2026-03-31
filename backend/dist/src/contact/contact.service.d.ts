import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createContactDto: CreateContactDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        email: string;
        phone: string | null;
        message: string;
        read_status: boolean | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        created_at: Date;
        email: string;
        phone: string | null;
        message: string;
        read_status: boolean | null;
    }[]>;
}
