import { Body, Controller, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
  ) {}

  @Post('/:idUser')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Param('idUser', ParseIntPipe) idUser: number, 
    @Body() createAddressDto: CreateAddressDto
  ){
    return this.addressService.createAddress(createAddressDto, idUser);
  }
}
