import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) 
    private cacheManager: Cache,
  ){}

  async getCache<T>(key: string, functionRequest: () => Promise<T>) {    
    //atravéz da key informada, busca os dados que já estão aramzenda em cache
    const allData: T = await this.cacheManager.get(key);

    //verifica se existe dados armazendos em cache
    if (allData) return allData;

    //armazena em uma variavel todos os dados que serão executados em cache
    const cities: T = await functionRequest();

    //salva os dados em cache
    await this.cacheManager.set(key, cities);

    return cities;
  }
}
