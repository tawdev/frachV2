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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BlogsService = class BlogsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBlogDto) {
        return this.prisma.client.blog.create({
            data: {
                ...createBlogDto,
                published_at: createBlogDto.status === 'published' ? new Date() : null,
            },
        });
    }
    async findAll(params) {
        const { q, category, status, author, page, limit } = params;
        const where = {};
        if (q) {
            where.OR = [
                { title: { contains: q } },
                { content: { contains: q } },
            ];
        }
        if (category)
            where.category = category;
        if (status)
            where.status = status;
        if (author)
            where.author_id = +author;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.client.blog.findMany({
                where,
                include: { author: { select: { id: true, username: true } } },
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.client.blog.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const blog = await this.prisma.client.blog.findUnique({
            where: { id },
            include: { author: { select: { id: true, username: true } } },
        });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async findOneBySlug(slug) {
        const blog = await this.prisma.client.blog.findUnique({
            where: { slug },
            include: { author: { select: { id: true, username: true } } },
        });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        await this.prisma.client.blog.update({
            where: { id: blog.id },
            data: { views: { increment: 1 } },
        });
        return blog;
    }
    async update(id, updateBlogDto) {
        const data = { ...updateBlogDto };
        if (updateBlogDto.status === 'published') {
            const existing = await this.prisma.client.blog.findUnique({ where: { id } });
            if (existing && !existing.published_at) {
                data.published_at = new Date();
            }
        }
        return this.prisma.client.blog.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.client.blog.delete({
            where: { id },
        });
    }
    async bulkDelete(ids) {
        return this.prisma.client.blog.deleteMany({
            where: {
                id: { in: ids },
            },
        });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map