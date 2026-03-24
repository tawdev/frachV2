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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(category, type_category) {
        const where = {};
        if (category) {
            where.category = { contains: category };
        }
        if (type_category) {
            where.type_category_id = Number(type_category);
        }
        return this.prisma.product.findMany({
            where,
            include: {
                categories: true,
                types_categories: true,
            },
            orderBy: { id: 'desc' }
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                categories: true,
                types_categories: true,
            }
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async getFeatured() {
        return this.prisma.product.findMany({
            take: 10,
            orderBy: { id: 'desc' },
            include: { categories: true }
        });
    }
    async create(data) {
        return this.prisma.product.create({
            data: {
                ...data,
                price: data.price ? String(data.price) : undefined,
                stock: data.stock ? parseInt(data.stock) : 0,
                category_id: data.category_id ? parseInt(data.category_id) : undefined,
                type_category_id: data.type_category_id ? parseInt(data.type_category_id) : undefined,
                types_id: data.types_id ? parseInt(data.types_id) : undefined,
            }
        });
    }
    async update(id, data) {
        return this.prisma.product.update({
            where: { id },
            data: {
                ...data,
                price: data.price ? String(data.price) : undefined,
                stock: data.stock !== undefined ? parseInt(data.stock) : undefined,
                category_id: data.category_id ? parseInt(data.category_id) : undefined,
                type_category_id: data.type_category_id ? parseInt(data.type_category_id) : undefined,
                types_id: data.types_id ? parseInt(data.types_id) : undefined,
            }
        });
    }
    async remove(id) {
        return this.prisma.product.delete({
            where: { id }
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map