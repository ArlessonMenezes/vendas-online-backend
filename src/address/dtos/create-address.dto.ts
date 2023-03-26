import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @IsNumber()
  idCity: number;

  @IsString()
  @IsOptional()
  complement: string;
  
  @IsNumber()
  numberAddress: number;
  
  @IsString()
  cep: string;
}