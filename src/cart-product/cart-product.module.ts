import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from './model/cart-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartProduct])
  ],
})
export class CartProductModule {}
