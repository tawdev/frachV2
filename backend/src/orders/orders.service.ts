import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { items, ...orderData } = createOrderDto;
      
      const order = await this.prisma.order.create({
        data: {
          ...orderData,
          status: 'En attente',
          order_items: {
            create: items.map(item => ({
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          order_items: true,
        },
      });
      return order;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        order_items: true,
      },
      orderBy: { created_at: 'desc' }
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        order_items: true,
      }
    });
  }
}
