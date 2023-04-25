import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
  @IsOptional()
  @IsNumber()
  amountPaymments?: number;
  
  @IsOptional()
  @IsString()
  codePix?: string;

  @IsOptional()
  @IsString()
  datePayment?: string;
}