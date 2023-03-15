import { ReturnStateDto } from 'src/state/dtos/return-state.dto';

import { City } from '../model/city.entity';

export class ReturnCityDto {
  name: string;
  states?: ReturnStateDto;

  constructor(city: City) {
    this.name = city.name;
    this.states = city.state ? new ReturnStateDto(city.state) : undefined;
  }
}