import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('types')
  findTypes() {
    return this.categoriesService.findTypes();
  }

  @Get('types-base')
  findTypesBase() {
    return this.categoriesService.findTypesBase();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.categoriesService.create(data);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.categoriesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }

  @Post('types')
  createType(@Body() data: any) {
    return this.categoriesService.createType(data);
  }

  @Patch('types/:id')
  updateType(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.categoriesService.updateType(id, data);
  }

  @Delete('types/:id')
  deleteType(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteType(id);
  }

  @Post('types-base')
  createTypeBase(@Body() data: any) {
    return this.categoriesService.createTypeBase(data);
  }

  @Patch('types-base/:id')
  updateTypeBase(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.categoriesService.updateTypeBase(id, data);
  }

  @Delete('types-base/:id')
  deleteTypeBase(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteTypeBase(id);
  }
}
