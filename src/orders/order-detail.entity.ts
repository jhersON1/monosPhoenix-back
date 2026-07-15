import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

const decimalTransformer: ValueTransformer = {
  to(value: number): number {
    return value;
  },
  from(value: string): number {
    return Number(value);
  },
};

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  orderId: string;

  @ManyToOne(() => Order, (order) => order.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ type: 'uuid' })
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'decimal', transformer: decimalTransformer })
  amount: number;

  @Column({ type: 'decimal', transformer: decimalTransformer })
  subtotal: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
