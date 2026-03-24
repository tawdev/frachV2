import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.category.findMany({
      include: {
        types_categories: true,
      },
      orderBy: { name: 'asc' }
    });
  }

  findTypes() {
    return this.prisma.typesCategory.findMany({
      include: {
        categories: true,
      },
      orderBy: { name: 'asc' }
    });
  }

  findTypesBase() {
    return this.prisma.type.findMany({
      orderBy: { name: 'asc' }
    });
  }
}
