import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from 'src/city/city.module';
import { UserModule } from 'src/user/user.module';

import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './model/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    UserModule,
    CityModule,
  ],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
