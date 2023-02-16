import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './model/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}  

  async createUser(createUser: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: createUser.email
      }
    });

    if (user) throw new BadRequestException('user alredy exists');

    const newUser = this.userRepository.create(createUser);
    await this.userRepository.save(newUser);

    const { password, ...userReturn } = newUser;

    return userReturn;
  }

  async getAllUsers() {
    return this.userRepository.find({
      select: ['idUser', 'name', 'email', 'cpf', 'phone'],
    });
  }
}
