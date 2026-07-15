import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customers/customer.entity';
import { Product } from '../products/product.entity';
import { OrderDetail } from './order-detail.entity';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, Customer])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
