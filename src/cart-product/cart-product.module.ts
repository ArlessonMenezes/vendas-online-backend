import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from './model/cart-product.entity';
import { CartProductService } from './cart-product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartProduct])
  ],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
