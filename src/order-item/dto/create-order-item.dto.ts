import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderItemDto {
    orderId: string;
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: 2
    })
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example: 33.33
    })
    price: number;
}
