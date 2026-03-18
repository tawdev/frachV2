import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Admin } from './entities/admin.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { TypeCategory } from './entities/type-category.entity';
import { TypeCategoryItem } from './entities/type-category-item.entity';
import { TypeEntity } from './entities/type.entity';
import { ContactMessage } from './entities/contact-message.entity';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'meubles_db',
      entities: [
        Category,
        Product,
        Admin,
        Order,
        OrderItem,
        TypeCategory,
        TypeCategoryItem,
        TypeEntity,
        ContactMessage
      ],
      synchronize: false,
    }),
    CategoriesModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
