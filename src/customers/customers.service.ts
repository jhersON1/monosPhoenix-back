import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(data: CreateCustomerDto): Promise<Customer> {
    await this.ensureEmailIsAvailable(data.email);

    const customer = this.customerRepository.create({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone ?? null,
      isActive: true,
    });

    try {
      return await this.customerRepository.save(customer);
    } catch (error: unknown) {
      this.handleUniqueEmailViolation(error);
      throw error;
    }
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }

    return customer;
  }

  async update(id: string, data: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);

    if (data.fullName !== undefined) {
      customer.fullName = data.fullName;
    }

    if (data.email !== undefined) {
      await this.ensureEmailIsAvailable(data.email, id);
      customer.email = data.email;
    }

    if (data.phone !== undefined) {
      customer.phone = data.phone;
    }

    try {
      return await this.customerRepository.save(customer);
    } catch (error: unknown) {
      this.handleUniqueEmailViolation(error);
      throw error;
    }
  }

  async deactivate(id: string): Promise<Customer> {
    const customer = await this.findOne(id);
    customer.isActive = false;
    return this.customerRepository.save(customer);
  }

  /**
   * The preliminary check provides a readable domain error. The entity's unique
   * constraint remains the final safeguard against concurrent requests.
   */
  private async ensureEmailIsAvailable(email: string, customerId?: string): Promise<void> {
    const customer = await this.customerRepository.findOne({ where: { email } });

    if (customer && customer.id !== customerId) {
      throw new ConflictException('The email address is already registered.');
    }
  }

  /** Converts PostgreSQL's unique constraint violation into a stable HTTP response. */
  private handleUniqueEmailViolation(error: unknown): void {
    if (
      error instanceof QueryFailedError &&
      (error as QueryFailedError & { driverError?: { code?: string } }).driverError?.code ===
        '23505'
    ) {
      throw new ConflictException('The email address is already registered.');
    }
  }
}
