import { AuthPayload } from 'src/auth/interfaces/auth-payload.interface';
export declare class CreateOrderDto {
    auth: AuthPayload;
    totalAmount: number;
    status: string;
    paymentMethod: string;
}
