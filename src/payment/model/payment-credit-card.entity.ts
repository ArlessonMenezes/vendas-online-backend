import { ChildEntity, Column } from 'typeorm';

import { Payment } from './payment.entity';

@ChildEntity()
export class PaymentCreditCard extends Payment {
  @Column()
  amountPayments: number;
}