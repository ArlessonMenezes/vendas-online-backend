import { Body, Controller, Post } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ReturnUserDto } from 'src/user/dtos/return-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDto: LoginDto) {
    return new ReturnUserDto(
      await this.authService.login(loginDto)
    );
  }
}
