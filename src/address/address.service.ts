import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from '../city/city.service';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/create-address.dto';
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

    const city = await this.cityService.findCityById(createAddressDto.idCity);

    return this.addressRepository.save({
      ...createAddressDto, 
      idUser: user.idUser,
      idCity: city.idCity,
    })
  }

  async findAddressByIdUser(idUser: number) {
    await this.userService.findUserById(idUser);

    const userHasAddress = await this.addressRepository.find({
      where: { idUser },
      relations: {
        city: {
          state: true,
        }
      }
    });

    if (!userHasAddress || userHasAddress.length === 0) 
      throw new NotFoundException(
      `Address not found for idUser: ${idUser}`
    );

    return userHasAddress;
  }
}
