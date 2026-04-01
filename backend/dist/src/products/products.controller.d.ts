import { MessageEvent } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(category?: string, type_category?: string, types_id?: string, q?: string): Promise<any[]>;
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
    search(query: string, category_id?: string): Promise<{
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
    findOne(id: string): Promise<any>;
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
    update(id: string, data: any): Promise<{
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
    updateStock(id: string, stock: number): Promise<{
        id: number;
        stock: number | null;
    }>;
    remove(id: string): Promise<{
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
    lowStockStream(): Observable<MessageEvent>;
}
