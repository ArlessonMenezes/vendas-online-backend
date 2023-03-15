import { State } from '../model/state.entity';

export class ReturnStateDto {
  name: string;

  constructor(state: State) {
    this.name = state.name;
  }
}