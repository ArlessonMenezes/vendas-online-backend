import { ReturnAddressDto } from 'src/address/dto/return-address.dto';

import { User } from '../model/user.entity';

export class ReturnUserDto {
  idUser: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses: ReturnAddressDto[];

  constructor(user: User){
    this.idUser = user.idUser;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.cpf = user.cpf;
    this.addresses = user.addresses 
    ? user.addresses.map((address) => new ReturnAddressDto(address)) 
    : undefined;
  }
}