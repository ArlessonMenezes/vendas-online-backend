import { ReturnUserDto } from "../../user/dtos/return-user.dto";

export class ReturnLoginDto {
  user: ReturnUserDto;
  access_token: string;
}