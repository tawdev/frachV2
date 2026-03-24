import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
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
    } & {
        id: number;
        name: string;
        description: string | null;
        image: string | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
    findTypes(): import("@prisma/client").Prisma.PrismaPromise<({
        categories: {
            id: number;
            name: string;
            description: string | null;
            image: string | null;
            created_at: Date;
            updated_at: Date;
        };
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
}
