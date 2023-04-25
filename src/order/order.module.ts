import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './model/order.entity';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    CartModule,
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
