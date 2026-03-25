import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        order_items: {
            id: number;
            product_name: string;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            product_id: number;
            order_id: number;
        }[];
    } & {
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal;
        status: string | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        order_items: ({
            product: {
                created_at: Date;
                updated_at: Date;
                id: number;
                price: import("@prisma/client-runtime-utils").Decimal;
                name: string;
                description: string | null;
                image: string | null;
                category: string;
                stock: number | null;
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
            product_name: string;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            product_id: number;
            order_id: number;
        })[];
    } & {
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal;
        status: string | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__OrderClient<({
        order_items: ({
            product: {
                created_at: Date;
                updated_at: Date;
                id: number;
                price: import("@prisma/client-runtime-utils").Decimal;
                name: string;
                description: string | null;
                image: string | null;
                category: string;
                stock: number | null;
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
            product_name: string;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            product_id: number;
            order_id: number;
        })[];
    } & {
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal;
        status: string | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateData: any): Promise<{
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal;
        status: string | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        customer_name: string;
        customer_email: string;
        customer_phone: string | null;
        customer_address: string;
        total_amount: import("@prisma/client-runtime-utils").Decimal;
        status: string | null;
        created_at: Date;
        updated_at: Date;
        id: number;
    }>;
    bestProductsByMonth(): Promise<{
        month: string;
        label: string;
        product: string;
        image: string;
        qty: number;
        revenue: number;
    }[]>;
}
