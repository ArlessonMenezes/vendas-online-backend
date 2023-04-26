import { CreateOrderDto } from 'src/order/dtos/create-order.dto';
import { ChildEntity, Column } from 'typeorm';

import { Payment } from './payment.entity';

@ChildEntity()
export class PaymentCreditCard extends Payment {
  @Column({ nullable: true })
  amountPayments: number;

  constructor(
    idStatus: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDto: CreateOrderDto,
  ) {
    super(      
      idStatus,
      price,
      discount, 
      finalPrice,
    )

    this.amountPayments = createOrderDto?.amountPayments || 0;
  }
}