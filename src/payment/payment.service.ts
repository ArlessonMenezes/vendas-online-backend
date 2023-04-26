import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/order/dtos/create-order.dto';
import { PaymentTypeEnum } from 'src/payment-status/enums/payment-status.enum';
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

  async createPayment(createOrderDto: CreateOrderDto) {
    if (createOrderDto.amountPayments) {
      const paymentCreditCard = new PaymentCreditCard(
        PaymentTypeEnum.DONE,
        0,
        0,
        0,
        createOrderDto,
      );

      return this.paymentRepository.save(paymentCreditCard);

    } else if (createOrderDto.codePix || createOrderDto.datePayment) {
      const paymentPix = new PaymentPix(
        PaymentTypeEnum.DONE,
        0,
        0,
        0,
        createOrderDto,
      );

      return this.paymentRepository.save(paymentPix);
    }

    throw new BadRequestException(
      'Amount Payments or code pix or date payment not found',
    );
  }
}
