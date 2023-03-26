import { User } from "../../user/model/user.entity";

export class LoginPayloadDto {
  idUser: number;
  typeUser: number;

  constructor(user: User) {
    this.idUser = user.idUser;
    this.typeUser = user.typeUser;
  }
}