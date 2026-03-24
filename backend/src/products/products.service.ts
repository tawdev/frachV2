import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async findAll(category?: string, type_category?: number) {
    const where: any = {};
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

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
        types_categories: true,
      }
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getFeatured() {
    return this.prisma.product.findMany({
      take: 10,
      orderBy: { id: 'desc' },
      include: { categories: true }
    });
  }

  async create(data: any) {
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

  async update(id: number, data: any) {
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

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id }
    });
  }
}
