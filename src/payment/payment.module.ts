import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './model/payment.entity';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
