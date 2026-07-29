import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(data: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create({
      name: data.name,
      description: data.description ?? null,
      price: data.price,
      stock: data.stock,
      isActive: true,
    });

    return this.productRepository.save(product);
  }

  private readonly logger = new Logger(ProductsService.name);

  findAll(): Promise<Product[]> {
    this.logger.log('Fetching all products...');
    return this.productRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    if (data.price !== undefined) {
      product.price = data.price;
    }

    if (data.stock !== undefined) {
      product.stock = data.stock;
    }

    return this.productRepository.save(product);
  }

  async deactivate(id: string): Promise<Product> {
    const product = await this.findOne(id);
    product.isActive = false;
    return this.productRepository.save(product);
  }
}
