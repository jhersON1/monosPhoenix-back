import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ProductsModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
