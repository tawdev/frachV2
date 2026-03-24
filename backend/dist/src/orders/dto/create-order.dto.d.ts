export declare class CreateOrderDto {
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    customer_address: string;
    total_amount: number;
    items: {
        product_id: number;
        product_name: string;
        quantity: number;
        price: number;
    }[];
}
