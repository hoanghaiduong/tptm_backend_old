import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { AuthPayload } from "src/auth/interfaces/auth-payload.interface";

export class CreateCartItemDto {
    auth:AuthPayload;
    productId: string;
    cartId: string;
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example:1
    })
    quantity: number;
}
