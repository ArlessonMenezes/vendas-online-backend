import { IsNotEmpty, IsNumber } from "class-validator";

export class InsertProductInCartDto {
  @IsNumber()
  @IsNotEmpty()
  idProduct: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}