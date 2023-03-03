import { User } from "../model/user.entity";

export class ReturnUserDto {
  idUser: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;

  constructor(user: User){
    this.idUser = user.idUser;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.cpf = user.cpf;
  }
}