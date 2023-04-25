import { Body, Controller, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';

import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ){}

  @Post('/cart/:idCart')
  @UsePipes(ValidationPipe)
  async createOrder(
    @Param('idCart', ParseIntPipe) idCart: number,
    @Body() createOrderDto: CreateOrderDto,
  ){
    return this.orderService.createOrder(idCart, createOrderDto);
  }
}
