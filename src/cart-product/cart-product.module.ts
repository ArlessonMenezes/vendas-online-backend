import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from './model/cart-product.entity';
import { CartProductService } from './cart-product.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartProduct]),
    CartProductModule,
    ProductModule,
  ],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
