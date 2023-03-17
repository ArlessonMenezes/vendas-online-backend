import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ReturnUserDto } from 'src/user/dtos/return-user.dto';
import { User } from 'src/user/model/user.entity';
import { UserService } from 'src/user/user.service';

import { LoginPayloadDto } from './dtos/login-payload.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSevice: UserService,
    private readonly jwtService: JwtService,
  ){}

  async login(loginDto: LoginDto) {
    const user: User = await this.userSevice.findUserByEmail(
      loginDto.email
    ).catch(() => undefined);

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!user || !isMatch) throw new NotFoundException('Email or password invalid');

    return {
      access_token: this.jwtService.sign({...new LoginPayloadDto(user)}),
      user: new ReturnUserDto(user),
    };
  }
}
