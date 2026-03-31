import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.client.category.findMany({
      include: {
        types_categories: true,
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    });
  }

  findOne(id: number) {
    return this.prisma.client.category.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.client.category.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.client.category.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.client.category.delete({ where: { id } });
  }

  findTypes() {
    return this.prisma.client.typesCategory.findMany({
      include: {
        categories: true,
        types: true,
      },
      orderBy: { name: 'asc' }
    });
  }

  findTypesBase() {
    return this.prisma.client.type.findMany({
      orderBy: { name: 'asc' }
    });
  }

  createTypeBase(data: any) {
    return this.prisma.client.type.create({ data });
  }

  updateTypeBase(id: number, data: any) {
    return this.prisma.client.type.update({ where: { id }, data });
  }

  deleteTypeBase(id: number) {
    return this.prisma.client.type.delete({ where: { id } });
  }

  createType(data: any) {
    return this.prisma.client.typesCategory.create({ data });
  }

  updateType(id: number, data: any) {
    return this.prisma.client.typesCategory.update({ where: { id }, data });
  }

  deleteType(id: number) {
    return this.prisma.client.typesCategory.delete({ where: { id } });
  }
}
