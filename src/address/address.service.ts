import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './model/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ){}

  async createAddress(createAddressDto: CreateAddressDto, idUser: number) {
    const user = await this.userService.findUserById(idUser);

    if (!user) throw new NotFoundException('user not found');

    const city = await this.cityService.findOneCityById(
      createAddressDto.idCity
    );

    if (!city) throw new NotFoundException('city not found');

    return this.addressRepository.save({
      ...createAddressDto, 
      idUser,
    })
    
  }
}
