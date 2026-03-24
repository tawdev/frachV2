import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
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
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__OrderClient<({
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
