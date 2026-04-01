import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    private lowStockSubject;
    get lowStockStream$(): import("rxjs").Observable<number>;
    emitCurrentLowStock(): Promise<number>;
    constructor(prisma: PrismaService);
    findAll(category?: string, type_category?: number, types_id?: number, query?: string): Promise<any[]>;
    findOne(id: number): Promise<any>;
    getFeatured(): Promise<({
        categories: {
            id: number;
            name: string;
            description: string | null;
            image: string | null;
            created_at: Date;
            updated_at: Date;
        } | null;
    } & {
        id: number;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        image: string | null;
        category: string;
        stock: number | null;
        created_at: Date;
        updated_at: Date;
        category_id: number | null;
        type_category_id: number | null;
        types_categories_items_id: number | null;
        types_id: number | null;
        max_longueur: import("@prisma/client/runtime/library").Decimal | null;
        max_largeur: import("@prisma/client/runtime/library").Decimal | null;
        longueur: import("@prisma/client/runtime/library").Decimal | null;
        largeur: import("@prisma/client/runtime/library").Decimal | null;
        max_length: import("@prisma/client/runtime/library").Decimal | null;
        max_width: import("@prisma/client/runtime/library").Decimal | null;
    })[]>;
    search(query: string, category_id?: number): Promise<{
        products: any[];
        categories: {
            id: number;
            name: string;
            description: string | null;
            image: string | null;
            created_at: Date;
            updated_at: Date;
        }[];
    }>;
    create(data: any): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        image: string | null;
        category: string;
        stock: number | null;
        created_at: Date;
        updated_at: Date;
        category_id: number | null;
        type_category_id: number | null;
        types_categories_items_id: number | null;
        types_id: number | null;
        max_longueur: import("@prisma/client/runtime/library").Decimal | null;
        max_largeur: import("@prisma/client/runtime/library").Decimal | null;
        longueur: import("@prisma/client/runtime/library").Decimal | null;
        largeur: import("@prisma/client/runtime/library").Decimal | null;
        max_length: import("@prisma/client/runtime/library").Decimal | null;
        max_width: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    updateStock(id: number, stock: number): Promise<{
        id: number;
        stock: number | null;
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        image: string | null;
        category: string;
        stock: number | null;
        created_at: Date;
        updated_at: Date;
        category_id: number | null;
        type_category_id: number | null;
        types_categories_items_id: number | null;
        types_id: number | null;
        max_longueur: import("@prisma/client/runtime/library").Decimal | null;
        max_largeur: import("@prisma/client/runtime/library").Decimal | null;
        longueur: import("@prisma/client/runtime/library").Decimal | null;
        largeur: import("@prisma/client/runtime/library").Decimal | null;
        max_length: import("@prisma/client/runtime/library").Decimal | null;
        max_width: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        image: string | null;
        category: string;
        stock: number | null;
        created_at: Date;
        updated_at: Date;
        category_id: number | null;
        type_category_id: number | null;
        types_categories_items_id: number | null;
        types_id: number | null;
        max_longueur: import("@prisma/client/runtime/library").Decimal | null;
        max_largeur: import("@prisma/client/runtime/library").Decimal | null;
        longueur: import("@prisma/client/runtime/library").Decimal | null;
        largeur: import("@prisma/client/runtime/library").Decimal | null;
        max_length: import("@prisma/client/runtime/library").Decimal | null;
        max_width: import("@prisma/client/runtime/library").Decimal | null;
    }>;
}
