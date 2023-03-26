import { ReturnCityDto } from "../../city/dtos/return-city.dto";
import { Address } from "../model/address.entity";

export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city: ReturnCityDto;

  constructor(address: Address) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city 
    ? new ReturnCityDto(address.city) 
    : undefined;
  }
}