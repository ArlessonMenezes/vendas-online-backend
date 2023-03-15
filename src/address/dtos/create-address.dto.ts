import { IsNumber, IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

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