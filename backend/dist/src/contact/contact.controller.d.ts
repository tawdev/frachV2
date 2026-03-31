import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
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
