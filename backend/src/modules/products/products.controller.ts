import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('typeCategoryId') typeCategoryId?: string,
    @Query('search') search?: string,
  ) {
    return this.productsService.findAll({
      categoryId: categoryId ? +categoryId : undefined,
      typeCategoryId: typeCategoryId ? +typeCategoryId : undefined,
      search,
    });
  }

  @Get('category/:name')
  findByCategory(@Param('name') name: string) {
    return this.productsService.findByCategory(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}
