import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersProduct } from './model/order-product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrdersProduct)
    private readonly orderProductRepository: Repository<OrdersProduct>
  ) {}

  async createOrderProduct(
    idProduct: number,
    idOrder: number,
    price: number,
    amount: number,
  ) {

    return this.orderProductRepository.save({
      amount,
      idOrder,
      price,
      idProduct,
    })
  }
}
