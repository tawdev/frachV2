import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { items, ...orderData } = createOrderDto;
      
      const order = await this.prisma.client.order.create({
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
    return this.prisma.client.order.findMany({
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
    return this.prisma.client.order.findUnique({
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
      return await this.prisma.client.order.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update order');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.client.order.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete order');
    }
  }

  async bestProductsByMonth() {
    const items = await this.prisma.client.orderItem.findMany({
      include: {
        order: { select: { created_at: true } },
        product: { select: { image: true, name: true } }
      },
      orderBy: { order: { created_at: 'desc' } },
    });

    const monthMap: Record<string, Record<string, { id: number; name: string; image: string; qty: number; revenue: number }>> = {};
    for (const item of items) {
      if (!item.product) continue;
      const d = new Date(item.order.created_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const prodId = String(item.product_id);
      
      if (!monthMap[key]) monthMap[key] = {};
      if (!monthMap[key][prodId]) {
        monthMap[key][prodId] = { 
          id: item.product_id, 
          name: item.product?.name || item.product_name, 
          image: item.product?.image || '', 
          qty: 0, 
          revenue: 0 
        };
      }
      monthMap[key][prodId].qty += item.quantity;
      monthMap[key][prodId].revenue += Number(item.price) * item.quantity;
    }

    return Object.entries(monthMap)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 6)
      .map(([month, products]) => {
        const top = Object.values(products).sort((a, b) => b.qty - a.qty)[0];
        const [year, m] = month.split('-');
        const dateObj = new Date(+year, +m - 1);
        const label = dateObj.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        return { 
          month, 
          label, 
          product: top.name, 
          image: top.image,
          qty: top.qty, 
          revenue: top.revenue 
        };
      });
  }

  async bestProductsForSpecificMonth(month: number, year: number) {
    const items = await this.prisma.client.orderItem.findMany({
      where: { order: { status: 'Livrée' } },
      include: {
        order: { select: { created_at: true } },
        product: { select: { image: true, name: true } }
      }
    });

    const productMap: Record<string, { id: number; name: string; image: string; qty: number; revenue: number }> = {};
    
    for (const item of items) {
      if (!item.product) continue;
      const d = new Date(item.order.created_at);
      if (d.getMonth() + 1 === month && d.getFullYear() === year) {
        const prodId = String(item.product_id);
        if (!productMap[prodId]) {
          productMap[prodId] = { 
            id: item.product_id, 
            name: item.product.name, 
            image: item.product.image || '', 
            qty: 0, 
            revenue: 0 
          };
        }
        productMap[prodId].qty += item.quantity;
        productMap[prodId].revenue += Number(item.price) * item.quantity;
      }
    }

    return Object.values(productMap)
      .sort((a, b) => b.qty - a.qty)
      .map((p, index) => ({
        rank: index + 1,
        product_name: p.name,
        total_quantity_sold: p.qty,
        revenue: p.revenue,
        image: p.image
      }));
  }
}
