import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        order_items: {
            id: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            product_name: string;
            quantity: number;
            product_id: number;
            order_id: number;
        }[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal;
        status: string | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        order_items: ({
            product: {
                id: number;
                name: string;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                image: string | null;
                category: string;
                stock: number | null;
                created_at: Date;
                updated_at: Date;
                category_id: number | null;
                type_category_id: number | null;
                types_categories_items_id: number | null;
                types_id: number | null;
                max_longueur: import("@prisma/client-runtime-utils").Decimal | null;
                max_largeur: import("@prisma/client-runtime-utils").Decimal | null;
                longueur: import("@prisma/client-runtime-utils").Decimal | null;
                largeur: import("@prisma/client-runtime-utils").Decimal | null;
                max_length: import("@prisma/client-runtime-utils").Decimal | null;
                max_width: import("@prisma/client-runtime-utils").Decimal | null;
            };
        } & {
            id: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            product_name: string;
            quantity: number;
            product_id: number;
            order_id: number;
        })[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal;
        status: string | null;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__OrderClient<({
        order_items: ({
            product: {
                id: number;
                name: string;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                image: string | null;
                category: string;
                stock: number | null;
                created_at: Date;
                updated_at: Date;
                category_id: number | null;
                type_category_id: number | null;
                types_categories_items_id: number | null;
                types_id: number | null;
                max_longueur: import("@prisma/client-runtime-utils").Decimal | null;
                max_largeur: import("@prisma/client-runtime-utils").Decimal | null;
                longueur: import("@prisma/client-runtime-utils").Decimal | null;
                largeur: import("@prisma/client-runtime-utils").Decimal | null;
                max_length: import("@prisma/client-runtime-utils").Decimal | null;
                max_width: import("@prisma/client-runtime-utils").Decimal | null;
            };
        } & {
            id: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            product_name: string;
            quantity: number;
            product_id: number;
            order_id: number;
        })[];
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal;
        status: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateData: any): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal;
        status: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal;
        status: string | null;
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
