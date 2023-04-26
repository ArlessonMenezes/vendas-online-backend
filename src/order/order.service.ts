import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { PaymentService } from 'src/payment/payment.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './model/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly cartService: CartService,
    private readonly paymentService: PaymentService,
  ){}

  async createOrder(createOrderDto: CreateOrderDto, idCart: number) {
    await this.paymentService.createPayment(createOrderDto);
    return null;
  }
}
