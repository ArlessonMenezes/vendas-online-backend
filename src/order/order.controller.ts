import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decoratos/roles.decoratos';
import { IdUser } from 'src/decoratos/user-id.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';

@Roles(UserTypeEnum.User, UserTypeEnum.Admin)
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ){}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @IdUser() idUSer: number,
  ){
    return this.orderService.createOrder(
      createOrderDto,
      idUSer,
    );
  }

  @Get()
  async findOrdersByiduser(@IdUser() idUser: number) {
    return this.orderService.findOrdersByiduser(idUser);
  }
}
