import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './model/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from 'src/product/product.module';
import { CartProductModule } from 'src/cart-product/cart-product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    ProductModule,
    CartProductModule,
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
