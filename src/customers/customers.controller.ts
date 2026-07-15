import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() data: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(data);
  }

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, data);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id', new ParseUUIDPipe()) id: string): Promise<Customer> {
    return this.customersService.deactivate(id);
  }
}
