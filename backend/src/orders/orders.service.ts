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
        order_items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { created_at: 'desc' }
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        order_items: {
          include: {
            product: true,
          },
        },
      }
    });
  }

  async update(id: number, updateData: any) {
    try {
      return await this.prisma.order.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update order');
    }
  }

  async remove(id: number) {
    try {
      // Order items are deleted automatically due to cascade (if configured in Prisma)
      // Otherwise we might need to delete them first.
      return await this.prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete order');
    }
  }

  async bestProductsByMonth() {
    // Fetch all order items with their parent order (for the date)
    const items = await this.prisma.orderItem.findMany({
      include: {
        order: { select: { created_at: true } },
      },
      orderBy: { order: { created_at: 'desc' } },
    });

    // Group by year-month, then by product_name, summing quantities
    const monthMap: Record<string, Record<string, { name: string; qty: number; revenue: number }>> = {};
    for (const item of items) {
      const d = new Date(item.order.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!monthMap[key]) monthMap[key] = {};
      if (!monthMap[key][item.product_name]) {
        monthMap[key][item.product_name] = { name: item.product_name, qty: 0, revenue: 0 };
      }
      monthMap[key][item.product_name].qty += item.quantity;
      monthMap[key][item.product_name].revenue += Number(item.price) * item.quantity;
    }

    // For each month, pick the top product
    return Object.entries(monthMap)
      .sort(([a], [b]) => b.localeCompare(a)) // newest first
      .slice(0, 6) // last 6 months
      .map(([month, products]) => {
        const top = Object.values(products).sort((a, b) => b.qty - a.qty)[0];
        const [year, m] = month.split('-');
        const label = new Date(+year, +m - 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        return { month, label, product: top.name, qty: top.qty, revenue: top.revenue };
      });
  }
}
