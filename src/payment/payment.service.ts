import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from 'src/cart-product/model/cart-product.entity';
import { Cart } from 'src/cart/model/cart.entity';
import { CreateOrderDto } from 'src/order/dtos/create-order.dto';
import { PaymentTypeEnum } from 'src/payment-status/enums/payment-status.enum';
import { Product } from 'src/product/model/product.entity';
import { Repository } from 'typeorm';
import { PaymentCreditCard } from './model/payment-credit-card.entity';
import { PaymentPix } from './model/payment-pix.entity';
import { Payment } from './model/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ){}

    generateFinalPrice(products: Product[], cart: Cart) {
      if (!cart.cartProducts || cart.cartProducts.length === 0) {
        return 0;
      }

      const finalPrice = cart.cartProducts?.map((cartProduct: CartProduct) => {
        const product = products.find(
          (product) => product.idProduct === cartProduct.idProduct
        )

        if (product) {
          return cartProduct.amount * product.price;
        }

        return 0;
      })
      .reduce((accumulator, curranceValue) => accumulator + curranceValue, 0);

      return finalPrice;
    }

  async createPayment(
    createOrderDto: CreateOrderDto,
    products: Product[],
    cart: Cart,
  ) {

    const finalPrice = this.generateFinalPrice(products, cart)

    if (createOrderDto.amountPayments) {
      const paymentCreditCard = new PaymentCreditCard(
        PaymentTypeEnum.DONE,
        finalPrice,
        0,
        finalPrice,
        createOrderDto,
      );

      return this.paymentRepository.save(paymentCreditCard);

    } else if (createOrderDto.codePix || createOrderDto.datePayment) {
      const paymentPix = new PaymentPix(
        PaymentTypeEnum.DONE,
        finalPrice,
        0,
        finalPrice,
        createOrderDto,
      );

      return this.paymentRepository.save(paymentPix);
    }

    throw new BadRequestException(
      'Amount Payments or code pix or date payment not found',
    );
  }
}
