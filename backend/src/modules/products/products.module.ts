import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Category } from '../../entities/category.entity';
import { TypeCategory } from '../../entities/type-category.entity';
import { TypeCategoryItem } from '../../entities/type-category-item.entity';
import { TypeEntity } from '../../entities/type.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    Product, 
    Category, 
    TypeCategory, 
    TypeCategoryItem, 
    TypeEntity
  ])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
