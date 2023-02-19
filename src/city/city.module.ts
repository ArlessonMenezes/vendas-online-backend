import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from 'src/state/model/state.entity';

import { CityController } from './city.controller';
import { CityService } from './city.service';
import { City } from './model/city.entity';

@Module({
  imports: [
    CacheModule.register({
      ttl: 90000000000,
    }),
    TypeOrmModule.forFeature([City, State]),
  ],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
