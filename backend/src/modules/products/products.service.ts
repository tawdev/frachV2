import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll(query?: { 
    categoryId?: number; 
    typeCategoryId?: number; 
    search?: string 
  }): Promise<Product[]> {
    const where: any = {};
    if (query?.categoryId) where.category_id = query.categoryId;
    if (query?.typeCategoryId) where.type_category_id = query.typeCategoryId;
    if (query?.search) {
      where.name = Like(`%${query.search}%`);
    }

    return this.productsRepository.find({
      where,
      relations: ['category', 'type_category', 'type_category_item', 'type'],
    });
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'type_category', 'type_category_item', 'type'],
    });
  }

  async findByCategory(categoryName: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: { category_name: categoryName },
      relations: ['category', 'type_category', 'type_category_item', 'type'],
    });
  }
}
