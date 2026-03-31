import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): import("generated/prisma").Prisma.PrismaPromise<({
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
    findTypes(): import("generated/prisma").Prisma.PrismaPromise<({
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
    findTypesBase(): import("generated/prisma").Prisma.PrismaPromise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(id: number): import("generated/prisma").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    } | null, null, import("generated/prisma/runtime/client").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    create(data: any): import("generated/prisma").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("generated/prisma/runtime/client").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import("generated/prisma").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("generated/prisma/runtime/client").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    remove(id: number): import("generated/prisma").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("generated/prisma/runtime/client").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    createType(data: any): import("generated/prisma").Prisma.Prisma__TypesCategoryClient<{
        id: number;
        name: string;
        image: string | null;
        created_at: Date;
        updated_at: Date;
        category_id: number;
        types_id: number | null;
    }, never, import("generated/prisma/runtime/client").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    updateType(id: number, data: any): import("generated/prisma").Prisma.Prisma__TypesCategoryClient<{
        id: number;
        name: string;
        image: string | null;
        created_at: Date;
        updated_at: Date;
        category_id: number;
        types_id: number | null;
    }, never, import("generated/prisma/runtime/client").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    deleteType(id: number): import("generated/prisma").Prisma.Prisma__TypesCategoryClient<{
        id: number;
        name: string;
        image: string | null;
        created_at: Date;
        updated_at: Date;
        category_id: number;
        types_id: number | null;
    }, never, import("generated/prisma/runtime/client").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    createTypeBase(data: any): import("generated/prisma").Prisma.Prisma__TypeClient<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }, never, import("generated/prisma/runtime/client").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    updateTypeBase(id: number, data: any): import("generated/prisma").Prisma.Prisma__TypeClient<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }, never, import("generated/prisma/runtime/client").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
    deleteTypeBase(id: number): import("generated/prisma").Prisma.Prisma__TypeClient<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }, never, import("generated/prisma/runtime/client").DefaultArgs, import("generated/prisma").Prisma.PrismaClientOptions>;
}
