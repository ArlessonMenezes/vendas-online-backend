import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(
    private readonly cityService: CityService,
  ){}

  @Get('/:idState')
  async getAllCitiesByIdState(
    @Param('idState', ParseIntPipe) idState: number,
  ) {
    return this.cityService.getCitiesByIdState(idState);
  }
}
