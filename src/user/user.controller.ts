import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';

import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
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

    @Get('/:idUser')
    async getUserById(@Param('idUser', ParseIntPipe) idUser: number) {
      return new ReturnUserDto(
        await this.userService.getUserByIdUsingRelations(idUser)
      );
    } 
}
