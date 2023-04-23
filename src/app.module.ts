import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AddressModule } from './address/address.module';
import { Address } from './address/model/address.entity';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { CartProduct } from './cart-product/model/cart-product.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/model/cart.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/model/category.entity';
import { CityModule } from './city/city.module';
import { City } from './city/model/city.entity';
import { RolesGuard } from './guards/roles.guard';
import { Product } from './product/model/product.entity';
import { ProductModule } from './product/product.module';
import { State } from './state/model/state.entity';
import { StateModule } from './state/state.module';
import { User } from './user/model/user.entity';
import { UserModule } from './user/user.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/model/payment.entity';
import { PaymentPix } from './payment/model/payment-pix.entity';
import { PaymentCreditCard } from './payment/model/payment-credit-card.entity';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { Order } from './order/model/order.entity';
import { OrderProduct } from './order-product/model/order-product.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
      entities: [
        User,
        City,
        Address,
        State,
        Category,
        Product,
        Cart,
        CartProduct,
        Payment,
        PaymentPix,
        PaymentCreditCard,
        Order,
        OrderProduct,
      ], 
    } as TypeOrmModuleOptions),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule,
    PaymentStatusModule,
    PaymentModule,
    OrderModule,
    OrderProductModule,
  ],
  controllers: [],
  providers: [ 
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}
