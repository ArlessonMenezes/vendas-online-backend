import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../decoratos/roles.decoratos';
import { IdUser } from '../decoratos/user-id.decorator';
import { UserTypeEnum } from '../user/enum/user-type.enum';

import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { ReturnAddressDto } from './dtos/return-address.dto';

@Roles(UserTypeEnum.User, UserTypeEnum.Admin)
@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @IdUser() idUser: number, 
    @Body() createAddressDto: CreateAddressDto
  ){
    console.log('idUser: ', idUser)
    return this.addressService.createAddress(createAddressDto, idUser);
  }

  @Get()
  @UsePipes(ValidationPipe)
  async findAddressByIdUser(@IdUser() idUser: number) {
    return (await this.addressService.findAddressByIdUser(idUser)
    ).map((address) => new ReturnAddressDto(address));
  }
}
