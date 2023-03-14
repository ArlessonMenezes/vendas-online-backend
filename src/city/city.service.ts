import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';
import { Repository } from 'typeorm';

import { City } from './model/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    private readonly cacheService: CacheService,
  ){}

  async getCitiesByIdState(idState: number) {
    return this.cacheService.getCache<City[]>(`state_ ${idState}`, 
      () => this.cityRepository.find({
        where: { idState },
      })
    );
  }

  async findCityById(idCity: number) {
    const city = await this.cityRepository.findOne({
      where: { idCity },
    })

    if (!city) throw new NotFoundException('city not found');

    return city;
  }
}
