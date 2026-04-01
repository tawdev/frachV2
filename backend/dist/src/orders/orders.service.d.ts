import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        order_items: {
            id: number;
            order_id: number;
            product_id: number;
            product_name: string;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        order_items: ({
            product: {
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
            };
        } & {
            id: number;
            order_id: number;
            product_id: number;
            product_name: string;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
        })[];
    } & {
        id: number;
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string | null;
        created_at: Date;
        updated_at: Date;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__OrderClient<({
        order_items: ({
            product: {
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
            };
        } & {
            id: number;
            order_id: number;
            product_id: number;
            product_name: string;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
        })[];
    } & {
        id: number;
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string | null;
        created_at: Date;
        updated_at: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateData: any): Promise<{
        id: number;
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client/runtime/library").Decimal;
        status: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    bestProductsByMonth(): Promise<{
        month: string;
        label: string;
        product: string;
        image: string;
        qty: number;
        revenue: number;
    }[]>;
    bestProductsForSpecificMonth(month: number, year: number): Promise<{
        rank: number;
        product_name: string;
        total_quantity_sold: number;
        revenue: number;
        image: string;
    }[]>;
}
