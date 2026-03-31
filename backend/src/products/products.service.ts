import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Subject } from 'rxjs';

@Injectable()
export class ProductsService {
  private lowStockSubject = new Subject<number>();

  get lowStockStream$() {
    return this.lowStockSubject.asObservable();
  }

  async emitCurrentLowStock() {
    const count = await this.prisma.client.product.count({ where: { stock: { lt: 10 } } });
    this.lowStockSubject.next(count);
    return count;
  }

  constructor(private prisma: PrismaService) { }

  async findAll(category?: string, type_category?: number, types_id?: number, query?: string) {
    const where: any = {};
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

    const products: any[] = await this.prisma.client.product.findMany({
      where,
      include: {
        categories: true,
        types_categories: true,
      },
      orderBy: { id: 'desc' }
    });

    // Fetch images for each product
    for (const product of products) {
      product.images = await this.prisma.client.$queryRawUnsafe(
        'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC, id ASC',
        product.id
      );
    }

    return products;
  }

  async findOne(id: number) {
    const product: any = await this.prisma.client.product.findUnique({
      where: { id },
      include: {
        categories: true,
        types_categories: true,
      }
    });

    if (!product) throw new NotFoundException('Product not found');

    // Fetch images
    product.images = await this.prisma.client.$queryRawUnsafe(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC, id ASC',
      id
    );

    return product;
  }

  async getFeatured() {
    return this.prisma.client.product.findMany({
      take: 10,
      orderBy: { id: 'desc' },
      include: { categories: true }
    });
  }

  async search(query: string, category_id?: number) {
    if (!query || query.length < 2) return { products: [], categories: [] };

    const productsWhere: any = {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } }
      ]
    };

    if (category_id) {
      productsWhere.category_id = category_id;
    }

    const [products, categories] = await Promise.all([
      this.prisma.client.product.findMany({
        where: productsWhere,
        take: 20,
        include: { categories: true }
      }),
      this.prisma.client.category.findMany({
        where: { name: { contains: query } },
        take: 5
      })
    ]);

    // Attach images for search results
    const productResults: any[] = [];
    for (const p of products) {
      const images = await this.prisma.client.$queryRawUnsafe(
        'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC, id ASC LIMIT 1',
        p.id
      );
      productResults.push({ ...p, images });
    }

    return { products: productResults, categories };
  }

  async create(data: any) {
    const { images, ...productData } = data;
    const product = await this.prisma.client.product.create({
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

    // Handle multiple images if provided
    if (data.images && Array.isArray(data.images)) {
      for (const imageUrl of data.images) {
        await this.prisma.client.$executeRawUnsafe(
          'INSERT INTO product_images (product_id, url) VALUES (?, ?)',
          product.id, imageUrl
        );
      }
    } else if (data.image) {
      // If only single image provided, add it as main
      await this.prisma.client.$executeRawUnsafe(
        'INSERT INTO product_images (product_id, url, is_main) VALUES (?, ?, ?)',
        product.id, data.image, 1
      );
    }

    return product;
  }

  async updateStock(id: number, stock: number) {
    if (stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    const result = await this.prisma.client.product.update({
      where: { id },
      data: { stock: Number(stock) },
      select: { id: true, stock: true }
    });
    this.emitCurrentLowStock();
    return result;
  }

  async update(id: number, data: any) {
    const { images, ...productData } = data;
    const product = await this.prisma.client.product.update({
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

    // Sync images if provided in data
    if (data.images && Array.isArray(data.images)) {
      // Delete old images
      await this.prisma.client.$executeRawUnsafe('DELETE FROM product_images WHERE product_id = ?', id);
      // Insert new ones
      for (const imageUrl of data.images) {
        await this.prisma.client.$executeRawUnsafe(
          'INSERT INTO product_images (product_id, url) VALUES (?, ?)',
          id, imageUrl
        );
      }
    }

    return product;
  }

  async remove(id: number) {
    return this.prisma.client.product.delete({
      where: { id }
    });
  }
}
