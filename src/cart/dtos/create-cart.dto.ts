import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartDto {
  @IsNumber()
  @IsNotEmpty()
  idProduct: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}