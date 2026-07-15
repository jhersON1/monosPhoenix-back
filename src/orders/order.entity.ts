import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { OrderDetail } from './order-detail.entity';

const decimalTransformer: ValueTransformer = {
  to(value: number): number {
    return value;
  },
  from(value: string): number {
    return Number(value);
  },
};

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  customerId: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({
    type: 'decimal',
    transformer: decimalTransformer,
  })
  total: number;

  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  status: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, { cascade: true })
  details: OrderDetail[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
