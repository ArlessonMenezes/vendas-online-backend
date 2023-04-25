import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './model/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly cartService: CartService,
  ){}

  async createOrder(idCart: number, createOrderDto: CreateOrderDto) {
    // const cart = await this.cartService.findCartByIdUser(idCart, true);
    return { message: "Testando endpoint de order" };
  }
}
