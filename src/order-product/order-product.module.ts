import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersProduct } from './model/order-product.entity';
import { OrderProductService } from './order-product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersProduct]),
  ],
  providers: [OrderProductService],
  exports: [OrderProductService],
})
export class OrderProductModule {}
