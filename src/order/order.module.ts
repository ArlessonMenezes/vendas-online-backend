import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './model/order.entity';
import { CartModule } from 'src/cart/cart.module';
import { PaymentModule } from 'src/payment/payment.module';
import { OrderProductModule } from 'src/order-product/order-product.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    CartModule,
    PaymentModule,
    OrderProductModule,
    ProductModule,
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
