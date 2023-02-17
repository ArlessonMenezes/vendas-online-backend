import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './model/state.entity';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([State])
  ],
  controllers: [StateController],
  providers: [StateService]
})
export class StateModule {}
