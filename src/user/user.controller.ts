import { Body, Controller, Get, Param, Patch, Post, Put, UsePipes } from '@nestjs/common';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { Roles } from 'src/decoratos/roles.decoratos';
import { IdUser } from 'src/decoratos/user-id.decorator';

import { CreateUserDto } from './dtos/create-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserTypeEnum } from './enum/user-type.enum';
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

    @Roles(UserTypeEnum.Admin, UserTypeEnum.User)
    @Patch('/update-password')
    async updatePassword(
      @IdUser() idUser: number,
      @Body() updatePassword: UpdatePasswordDto,
    ) {
      return this.userService.updatePassword(idUser, updatePassword);
    }
}
