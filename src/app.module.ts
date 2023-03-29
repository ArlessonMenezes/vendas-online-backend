import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AddressModule } from './address/address.module';
import { Address } from './address/model/address.entity';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
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
      entities: [User, City, Address, State, Category, Product], 
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
