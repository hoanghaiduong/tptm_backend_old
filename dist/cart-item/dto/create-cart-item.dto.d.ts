import { AuthPayload } from "src/auth/interfaces/auth-payload.interface";
export declare class CreateCartItemDto {
    auth: AuthPayload;
    productId: string;
    cartId: string;
    quantity: number;
}
