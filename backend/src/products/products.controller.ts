import { Controller, Get, Post, Patch, Delete, Param, Query, Body, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  findAll(@Query('category') category?: string, @Query('type_category') type_category?: string) {
    return this.productsService.findAll(category, type_category ? +type_category : undefined);
  }

  @Get('featured')
  getFeatured() {
    return this.productsService.getFeatured();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  create(@Body() data: any) {
    return this.productsService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.productsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
