import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.category.findMany({
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
    return this.prisma.category.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.category.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.category.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }

  findTypes() {
    return this.prisma.typesCategory.findMany({
      include: {
        categories: true,
        types: true,
      },
      orderBy: { name: 'asc' }
    });
  }

  findTypesBase() {
    return this.prisma.type.findMany({
      orderBy: { name: 'asc' }
    });
  }

  createTypeBase(data: any) {
    return this.prisma.type.create({ data });
  }

  updateTypeBase(id: number, data: any) {
    return this.prisma.type.update({ where: { id }, data });
  }

  deleteTypeBase(id: number) {
    return this.prisma.type.delete({ where: { id } });
  }

  createType(data: any) {
    return this.prisma.typesCategory.create({ data });
  }

  updateType(id: number, data: any) {
    return this.prisma.typesCategory.update({ where: { id }, data });
  }

  deleteType(id: number) {
    return this.prisma.typesCategory.delete({ where: { id } });
  }
}
