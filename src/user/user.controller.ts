import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {

  }
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
       return this.userService.createUser(createUserDto);
    }

    @Get()
    getAllUsers() {
      return this.userService.getAllUsers();
    }
}
