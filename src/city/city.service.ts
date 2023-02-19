import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { State } from 'src/state/model/state.entity';
import { Repository } from 'typeorm';

import { City } from './model/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @Inject(CACHE_MANAGER) 
    private cacheManager: Cache,
  ){}

  async getAllCitiesByIdState(idState: number) {
    const state = await this.stateRepository.findOne({
      where: { idState },
    });
    
    if (!state) throw new NotFoundException('State not found');
    
    const citiesCache: City[] = await this.cacheManager.get(
      `state_${idState}`,
    );

    if (citiesCache) return citiesCache;

    const cities = await this.cityRepository.find({
      where: { idState },
    });

    await this.cacheManager.set(`${idState}`, 'value');

    return cities;
  }
}
