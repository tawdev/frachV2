"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        try {
            const { items, ...orderData } = createOrderDto;
            const order = await this.prisma.client.order.create({
                data: {
                    ...orderData,
                    status: 'En attente',
                    order_items: {
                        create: items.map(item => ({
                            product_id: item.product_id,
                            product_name: item.product_name,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
                include: {
                    order_items: true,
                },
            });
            return order;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create order');
        }
    }
    findAll() {
        return this.prisma.client.order.findMany({
            include: {
                order_items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' }
        });
    }
    findOne(id) {
        return this.prisma.client.order.findUnique({
            where: { id },
            include: {
                order_items: {
                    include: {
                        product: true,
                    },
                },
            }
        });
    }
    async update(id, updateData) {
        try {
            return await this.prisma.client.order.update({
                where: { id },
                data: updateData,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update order');
        }
    }
    async remove(id) {
        try {
            return await this.prisma.client.order.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete order');
        }
    }
    async bestProductsByMonth() {
        const items = await this.prisma.client.orderItem.findMany({
            include: {
                order: { select: { created_at: true } },
                product: { select: { image: true, name: true } }
            },
            orderBy: { order: { created_at: 'desc' } },
        });
        const monthMap = {};
        for (const item of items) {
            if (!item.product)
                continue;
            const d = new Date(item.order.created_at);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            const prodId = String(item.product_id);
            if (!monthMap[key])
                monthMap[key] = {};
            if (!monthMap[key][prodId]) {
                monthMap[key][prodId] = {
                    id: item.product_id,
                    name: item.product?.name || item.product_name,
                    image: item.product?.image || '',
                    qty: 0,
                    revenue: 0
                };
            }
            monthMap[key][prodId].qty += item.quantity;
            monthMap[key][prodId].revenue += Number(item.price) * item.quantity;
        }
        return Object.entries(monthMap)
            .sort(([a], [b]) => b.localeCompare(a))
            .slice(0, 6)
            .map(([month, products]) => {
            const top = Object.values(products).sort((a, b) => b.qty - a.qty)[0];
            const [year, m] = month.split('-');
            const dateObj = new Date(+year, +m - 1);
            const label = dateObj.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
            return {
                month,
                label,
                product: top.name,
                image: top.image,
                qty: top.qty,
                revenue: top.revenue
            };
        });
    }
    async bestProductsForSpecificMonth(month, year) {
        const items = await this.prisma.client.orderItem.findMany({
            where: { order: { status: 'Livrée' } },
            include: {
                order: { select: { created_at: true } },
                product: { select: { image: true, name: true } }
            }
        });
        const productMap = {};
        for (const item of items) {
            if (!item.product)
                continue;
            const d = new Date(item.order.created_at);
            if (d.getMonth() + 1 === month && d.getFullYear() === year) {
                const prodId = String(item.product_id);
                if (!productMap[prodId]) {
                    productMap[prodId] = {
                        id: item.product_id,
                        name: item.product.name,
                        image: item.product.image || '',
                        qty: 0,
                        revenue: 0
                    };
                }
                productMap[prodId].qty += item.quantity;
                productMap[prodId].revenue += Number(item.price) * item.quantity;
            }
        }
        return Object.values(productMap)
            .sort((a, b) => b.qty - a.qty)
            .map((p, index) => ({
            rank: index + 1,
            product_name: p.name,
            total_quantity_sold: p.qty,
            revenue: p.revenue,
            image: p.image
        }));
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map