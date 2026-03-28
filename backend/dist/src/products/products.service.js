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
const rxjs_1 = require("rxjs");
let ProductsService = class ProductsService {
    prisma;
    lowStockSubject = new rxjs_1.Subject();
    get lowStockStream$() {
        return this.lowStockSubject.asObservable();
    }
    async emitCurrentLowStock() {
        const count = await this.prisma.product.count({ where: { stock: { lt: 10 } } });
        this.lowStockSubject.next(count);
        return count;
    }
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(category, type_category, types_id, query) {
        const where = {};
        if (category) {
            where.category = { contains: category };
        }
        if (type_category) {
            where.type_category_id = Number(type_category);
        }
        if (types_id) {
            where.types_id = Number(types_id);
        }
        if (query) {
            where.OR = [
                { name: { contains: query } },
                { description: { contains: query } }
            ];
        }
        const products = await this.prisma.product.findMany({
            where,
            include: {
                categories: true,
                types_categories: true,
            },
            orderBy: { id: 'desc' }
        });
        for (const product of products) {
            product.images = await this.prisma.$queryRawUnsafe('SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC, id ASC', product.id);
        }
        return products;
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
        product.images = await this.prisma.$queryRawUnsafe('SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC, id ASC', id);
        return product;
    }
    async getFeatured() {
        return this.prisma.product.findMany({
            take: 10,
            orderBy: { id: 'desc' },
            include: { categories: true }
        });
    }
    async search(query, category_id) {
        if (!query || query.length < 2)
            return { products: [], categories: [] };
        const productsWhere = {
            OR: [
                { name: { contains: query } },
                { description: { contains: query } }
            ]
        };
        if (category_id) {
            productsWhere.category_id = category_id;
        }
        const [products, categories] = await Promise.all([
            this.prisma.product.findMany({
                where: productsWhere,
                take: 20,
                include: { categories: true }
            }),
            this.prisma.category.findMany({
                where: { name: { contains: query } },
                take: 5
            })
        ]);
        const productResults = [];
        for (const p of products) {
            const images = await this.prisma.$queryRawUnsafe('SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC, id ASC LIMIT 1', p.id);
            productResults.push({ ...p, images });
        }
        return { products: productResults, categories };
    }
    async create(data) {
        const { images, ...productData } = data;
        const product = await this.prisma.product.create({
            data: {
                name: productData.name,
                description: productData.description,
                price: productData.price ? String(productData.price) : "0",
                image: productData.image,
                category: productData.category,
                stock: productData.stock ? parseInt(productData.stock) : 0,
                category_id: productData.category_id ? parseInt(productData.category_id) : undefined,
                type_category_id: productData.type_category_id ? parseInt(productData.type_category_id) : undefined,
                types_id: productData.types_id ? parseInt(productData.types_id) : undefined,
            }
        });
        if (data.images && Array.isArray(data.images)) {
            for (const imageUrl of data.images) {
                await this.prisma.$executeRawUnsafe('INSERT INTO product_images (product_id, url) VALUES (?, ?)', product.id, imageUrl);
            }
        }
        else if (data.image) {
            await this.prisma.$executeRawUnsafe('INSERT INTO product_images (product_id, url, is_main) VALUES (?, ?, ?)', product.id, data.image, 1);
        }
        return product;
    }
    async updateStock(id, stock) {
        if (stock < 0) {
            throw new Error('Stock cannot be negative');
        }
        const result = await this.prisma.product.update({
            where: { id },
            data: { stock: Number(stock) },
            select: { id: true, stock: true }
        });
        this.emitCurrentLowStock();
        return result;
    }
    async update(id, data) {
        const { images, ...productData } = data;
        const product = await this.prisma.product.update({
            where: { id },
            data: {
                name: productData.name,
                description: productData.description,
                price: productData.price ? String(productData.price) : undefined,
                image: productData.image,
                category: productData.category,
                stock: productData.stock !== undefined ? parseInt(productData.stock) : undefined,
                category_id: productData.category_id ? parseInt(productData.category_id) : undefined,
                type_category_id: productData.type_category_id ? parseInt(productData.type_category_id) : undefined,
                types_id: productData.types_id ? parseInt(productData.types_id) : undefined,
            }
        });
        if (data.images && Array.isArray(data.images)) {
            await this.prisma.$executeRawUnsafe('DELETE FROM product_images WHERE product_id = ?', id);
            for (const imageUrl of data.images) {
                await this.prisma.$executeRawUnsafe('INSERT INTO product_images (product_id, url) VALUES (?, ?)', id, imageUrl);
            }
        }
        return product;
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