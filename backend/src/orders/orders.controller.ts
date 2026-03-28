import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('best-products')
  bestProductsByMonth(@Query('month') month?: string, @Query('year') year?: string) {
    if (month && year) {
      return this.ordersService.bestProductsForSpecificMonth(+month, +year);
    }
    return this.ordersService.bestProductsByMonth();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Post(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.update(+id, { status });
  }

  @Post(':id/delete') // Using POST instead of DELETE to avoid issues with some proxies/environments if delete isn't allowed
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
