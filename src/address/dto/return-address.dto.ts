import { Address } from "../model/address.entity";

export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;

  constructor(address: Address) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
  }
}