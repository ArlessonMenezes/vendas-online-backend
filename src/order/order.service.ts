import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from 'src/cart-product/model/cart-product.entity';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/model/cart.entity';
import { OrderProductService } from 'src/order-product/order-product.service';
import { Payment } from 'src/payment/model/payment.entity';
import { PaymentService } from 'src/payment/payment.service';
import { Product } from 'src/product/model/product.entity';
import { ProductService } from 'src/product/product.service';
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
    private readonly productService: ProductService,
  ){}

  async saveOrder(
    createOrderDto: CreateOrderDto,
    idUser: number,
    payment: Payment,
  ) {

    return await this.orderRepository.save({
      idAddress: createOrderDto.idAddress,
      date: new Date(),
      idPayment: payment.idPayment,
      idUser,  
    });    
  }

  async createOrderProductUsingCart(cart: Cart, idOrder: number, products: Product[]) {
    return Promise.all(
      cart.cartProducts.map((cartProduct) => {
        this.orderProductService.createOrderProduct(
          cartProduct.idProduct,
          idOrder,
          products.find(
            (product) => product.idProduct === cartProduct.idProduct
          )?.price || 0,
          cartProduct.amount,
        );
    }));
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    idUser: number,
  ) {

    const cart = await this.cartService.findCartByIdUser(idUser, true);
    
    const products = await this.productService.findAll(
      cart.cartProducts.map(
        (cartProduct) => cartProduct.idProduct
      )
    )

    const payment = await this.paymentService.createPayment(
      createOrderDto,
      products,
      cart,
    );

    const order = await this.saveOrder(createOrderDto, idUser, payment);

    await this.createOrderProductUsingCart(cart, order.idOrder, products);

    await this.cartService.clearCart(idUser);

    return order;
  }

  async findOrdersByiduser(idUser: number) {
    const orders = await this.orderRepository.find({
      where: { idUser },
      relations: {
        address: true,
        ordesProduct: {
          product: true,
        },
        payment: {
          paymentStatus: true,
        },
      }
    })

    if (!orders || orders.length === 0) {
      throw new NotFoundException("Orders not found.");
    }

    return orders;
  }
}
