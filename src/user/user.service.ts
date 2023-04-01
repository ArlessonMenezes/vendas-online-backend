import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UserTypeEnum } from './enum/user-type.enum';
import { User } from './model/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}  

  async createUser(createUser: CreateUserDto) {
    const user = await this.findUserByEmail(createUser.email);

    if (user) throw new BadRequestException('user alredy exists');

    const hashedPassword = await hash(createUser.password, 10);

    const newUser = this.userRepository.create({
      ...createUser,
      typeUser: UserTypeEnum.User,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    const { password, ...userReturn } = newUser;

    return userReturn;
  }

  async getUserByIdUsingRelations(idUser: number) {
    await this.findUserById(idUser);

    return this.userRepository.findOne({
      where: { idUser },
      relations: {
        addresses: {
          city: { state: true }
        }
      },
    })
  }

  async getAllUsers() {
    const users = await this.userRepository.find();

    const returnUsers = users.map(user => new ReturnUserDto(user))

    return returnUsers;
  }

  async findUserById(idUser: number) {
    const user = await this.userRepository.findOne({
      where: { idUser },
    })

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    })
  }  
}
