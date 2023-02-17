import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './model/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ){}

  async getAllState() {
    return this.stateRepository.find();
  }
}
