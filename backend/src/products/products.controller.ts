import { Controller, Get, Post, Patch, Delete, Param, Query, Body, NotFoundException, Sse, MessageEvent } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Observable, from, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  findAll(
    @Query('category') category?: string, 
    @Query('type_category') type_category?: string,
    @Query('types_id') types_id?: string,
    @Query('q') q?: string
  ) {
    return this.productsService.findAll(
      category, 
      type_category ? +type_category : undefined,
      types_id ? +types_id : undefined,
      q
    );
  }

  @Get('featured')
  getFeatured() {
    return this.productsService.getFeatured();
  }

  @Get('search')
  search(
    @Query('q') query: string,
    @Query('category_id') category_id?: string
  ) {
    return this.productsService.search(query, category_id ? +category_id : undefined);
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

  @Patch(':id/stock')
  updateStock(@Param('id') id: string, @Body('stock') stock: number) {
    return this.productsService.updateStock(+id, stock);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Sse('stream/low-stock')
  lowStockStream(): Observable<MessageEvent> {
    const initial$ = from(this.productsService.emitCurrentLowStock()).pipe(
      map(count => ({ data: { count } } as MessageEvent))
    );
    const updates$ = this.productsService.lowStockStream$.pipe(
      map(count => ({ data: { count } } as MessageEvent))
    );
    return merge(initial$, updates$);
  }
}
