import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { CacheService } from 'src/cache/cache.service';
import { State } from 'src/state/model/state.entity';
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

  async findOneCityById(idCity: number) {
    return this.cityRepository.findOne({
      where: { idCity },
    })
  }
}
