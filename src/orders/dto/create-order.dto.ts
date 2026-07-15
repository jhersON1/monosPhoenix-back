import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDetailDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  amount: number;
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateOrderDetailDto)
  details: CreateOrderDetailDto[];
}
