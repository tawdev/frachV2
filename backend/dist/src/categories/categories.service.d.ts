import { PrismaService } from '../prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        types_categories: {
            id: number;
            name: string;
            image: string | null;
            created_at: Date;
            updated_at: Date;
            category_id: number;
            types_id: number | null;
        }[];
        _count: {
            products: number;
        };
    } & {
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(data: any): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findTypes(): import("@prisma/client").Prisma.PrismaPromise<({
        categories: {
            id: number;
            name: string;
            description: string | null;
            image: string | null;
            created_at: Date;
            updated_at: Date;
        };
        types: {
            id: number;
            name: string;
            created_at: Date;
            updated_at: Date;
        } | null;
    } & {
        id: number;
        name: string;
        image: string | null;
        created_at: Date;
        updated_at: Date;
        category_id: number;
        types_id: number | null;
    })[]>;
    findTypesBase(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    createTypeBase(data: any): import("@prisma/client").Prisma.Prisma__TypeClient<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateTypeBase(id: number, data: any): import("@prisma/client").Prisma.Prisma__TypeClient<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteTypeBase(id: number): import("@prisma/client").Prisma.Prisma__TypeClient<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createType(data: any): import("@prisma/client").Prisma.Prisma__TypesCategoryClient<{
        id: number;
        name: string;
        image: string | null;
        created_at: Date;
        updated_at: Date;
        category_id: number;
        types_id: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateType(id: number, data: any): import("@prisma/client").Prisma.Prisma__TypesCategoryClient<{
        id: number;
        name: string;
        image: string | null;
        created_at: Date;
        updated_at: Date;
        category_id: number;
        types_id: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteType(id: number): import("@prisma/client").Prisma.Prisma__TypesCategoryClient<{
        id: number;
        name: string;
        image: string | null;
        created_at: Date;
        updated_at: Date;
        category_id: number;
        types_id: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
