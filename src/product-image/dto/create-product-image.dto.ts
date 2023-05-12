import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateProductImageDto {


    @IsUUID()
    @IsNotEmpty()
    readonly productId: string;

    @ApiProperty({
        example: "src/files/product/uid_productId_filename.png|jpg|jpeg"
    })
    @IsString()
    @IsNotEmpty()
    readonly imageUrl: string;

    @ApiProperty({ required: false })
    @IsString()
    readonly caption?: string;

    @ApiProperty({ required: false })
    @IsString()
    readonly description?: string;
}
