import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {

  }
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
       return this.userService.createUser(createUserDto);
    }

    @Get()
    getAllUsers() {
      return this.userService.getAllUsers();
    }
}
