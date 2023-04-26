import { CreateOrderDto } from 'src/order/dtos/create-order.dto';
import { ChildEntity, Column } from 'typeorm';

import { Payment } from './payment.entity';

@ChildEntity()
export class PaymentPix extends Payment {
  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  datePayment: Date;

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

    this.code = createOrderDto?.codePix || '';
    this.datePayment = new Date(createOrderDto?.datePayment || '');
  }
}