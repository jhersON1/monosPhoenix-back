import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';

const decimalTransformer: ValueTransformer = {
  /** Stores the numeric value without changing its decimal representation. */
  to(value: number): number {
    return value;
  },

  /** Converts PostgreSQL numeric values, returned as strings, into API numbers. */
  from(value: string): number {
    return Number(value);
  },
};

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    type: 'decimal',
    transformer: decimalTransformer,
  })
  price: number;

  @Column({ type: 'integer' })
  stock: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
