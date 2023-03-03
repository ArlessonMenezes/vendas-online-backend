import { CacheModule as CacheModuleNest, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from 'src/cache/cache.module';

import { CityController } from './city.controller';
import { CityService } from './city.service';
import { City } from './model/city.entity';

@Module({
  imports: [
    CacheModuleNest.register({
      ttl: 90000000000,
    }),
    TypeOrmModule.forFeature([City]),
    CacheModule,
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
