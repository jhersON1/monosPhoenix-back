import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderDetail } from './order-detail.entity';
import { Product } from '../products/product.entity';
import { Customer } from '../customers/customer.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(data: CreateOrderDto): Promise<Order> {
    const customer = await this.customerRepository.findOne({ where: { id: data.customerId } });
    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }
    if (!customer.isActive) {
      throw new BadRequestException('Customer is inactive.');
    }

    let total = 0;
    const details: OrderDetail[] = [];

    for (const item of data.details) {
      const product = await this.productRepository.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found.`);
      }
      if (!product.isActive) {
        throw new BadRequestException(`Product ${product.name} is inactive.`);
      }
      if (product.stock < item.amount) {
        throw new BadRequestException(`Product ${product.name} has insufficient stock.`);
      }

      // Decrementar stock
      product.stock -= item.amount;
      await this.productRepository.save(product);

      const subtotal = product.price * item.amount;
      total += subtotal;

      const detail = new OrderDetail();
      detail.productId = product.id;
      detail.amount = item.amount;
      detail.subtotal = subtotal;
      details.push(detail);
    }

    const order = this.orderRepository.create({
      customerId: customer.id,
      total,
      details,
    });

    return this.orderRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      order: { createdAt: 'DESC' },
      relations: {
        customer: true,
        details: {
          product: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        details: {
          product: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    return order;
  }

  async update(id: string, data: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (data.status) {
      order.status = data.status;
    }

    return this.orderRepository.save(order);
  }
}
