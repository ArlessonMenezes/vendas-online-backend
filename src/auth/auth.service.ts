import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { compare } from 'bcrypt';
import { User } from 'src/user/model/user.entity';
import { UserService } from 'src/user/user.service';

import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSevice: UserService,
  ){}

  async login(loginDto: LoginDto) {
    const user: User = await this.userSevice.findUserByEmail(
      loginDto.email
    ).catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) throw new NotFoundException('Email or password invalid');

    return user;
  }
}
