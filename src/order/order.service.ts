import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { OrderProductService } from 'src/order-product/order-product.service';
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
    private readonly orderProductService: OrderProductService,
  ){}

  async createOrder(
    createOrderDto: CreateOrderDto,
    idCart: number,
    idUser: number,
  ) {
    const payment = await this.paymentService.createPayment(createOrderDto);


     
    const order = await this.orderRepository.save({
      idAddress: createOrderDto.idAddress,
      date: new Date(),
      idPayment: payment.idPayment,
      idUser,  
    });

    const cart = await this.cartService.findCartByIdUser(idUser, true);

    cart.cartProducts?.forEach((cartProduct) => {
     this.orderProductService.createOrderProduct(
        cartProduct.idProduct,
        order.idOrder,
        0,
        cartProduct.amount,
      )
    })

    return null;
  }
}
