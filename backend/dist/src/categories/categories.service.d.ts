import { PrismaService } from '../prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        types_categories: {
            id: number;
            name: string;
            image: string | null;
            category_id: number;
            types_id: number | null;
            created_at: Date;
            updated_at: Date;
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
    findOne(id: number): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: any): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, data: any): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findTypes(): import(".prisma/client").Prisma.PrismaPromise<({
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
        category_id: number;
        types_id: number | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
    findTypesBase(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    createTypeBase(data: any): import(".prisma/client").Prisma.Prisma__TypeClient<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateTypeBase(id: number, data: any): import(".prisma/client").Prisma.Prisma__TypeClient<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteTypeBase(id: number): import(".prisma/client").Prisma.Prisma__TypeClient<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createType(data: any): import(".prisma/client").Prisma.Prisma__TypesCategoryClient<{
        id: number;
        name: string;
        image: string | null;
        category_id: number;
        types_id: number | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateType(id: number, data: any): import(".prisma/client").Prisma.Prisma__TypesCategoryClient<{
        id: number;
        name: string;
        image: string | null;
        category_id: number;
        types_id: number | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteType(id: number): import(".prisma/client").Prisma.Prisma__TypesCategoryClient<{
        id: number;
        name: string;
        image: string | null;
        category_id: number;
        types_id: number | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
