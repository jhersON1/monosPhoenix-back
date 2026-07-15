import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  it('registers an active product by default', async () => {
    const repository = {
      create: jest.fn((product: Partial<Product>) => product),
      save: jest.fn((product: Product) => Promise.resolve(product)),
    } as unknown as Repository<Product>;
    const module = await Test.createTestingModule({
      providers: [ProductsService, { provide: getRepositoryToken(Product), useValue: repository }],
    }).compile();

    const service = module.get(ProductsService);
    const product = await service.create({
      name: 'Mechanical Keyboard',
      price: 89.99,
      stock: 10,
    });

    expect(product).toMatchObject({
      name: 'Mechanical Keyboard',
      description: null,
      price: 89.99,
      stock: 10,
      isActive: true,
    });
  });
});
