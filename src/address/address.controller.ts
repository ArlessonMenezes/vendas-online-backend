import { Body, Controller, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decoratos/roles.decoratos';
import { IdUser } from 'src/decoratos/user-id.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';

@Roles(UserTypeEnum.User)
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
}
