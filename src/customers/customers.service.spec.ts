import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  it('registers an active customer by default', async () => {
    const repository = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn((customer: Partial<Customer>) => customer),
      save: jest.fn((customer: Customer) => Promise.resolve(customer)),
    } as unknown as Repository<Customer>;
    const module = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: getRepositoryToken(Customer), useValue: repository },
      ],
    }).compile();

    const service = module.get(CustomersService);
    const customer = await service.create({
      fullName: 'Ana Pérez',
      email: 'ana@example.com',
    });

    expect(customer).toMatchObject({
      fullName: 'Ana Pérez',
      email: 'ana@example.com',
      phone: null,
      isActive: true,
    });
  });
});
