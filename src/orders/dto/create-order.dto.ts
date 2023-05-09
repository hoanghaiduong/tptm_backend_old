import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { AuthPayload } from 'src/auth/interfaces/auth-payload.interface';
import { Column } from 'typeorm';
import { OrderStatus } from '../enum/order-status.enum';
import { PaymentMethod } from '../enum/order-payment.enum';

export class CreateOrderDto {
    auth: AuthPayload
   
    totalAmount: number;

    status: string;
  
    paymentMethod: string;

}
