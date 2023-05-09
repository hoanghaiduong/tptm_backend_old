
// restaurant.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { AuthPayload } from 'src/auth/interfaces/auth-payload.interface';

export class CreateRestaurantDto {
    @ApiProperty({ example: 'NEO SUKI RESTAURANT' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'PHAN TRUNG STREET' })
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: '10.9745114' })
    lat: number;
    @ApiProperty({ example: '106.8768659' })
    lng: number;

    @ApiProperty({ example: 5 })
    rating: number;
   
    @ApiProperty({ example: "Nhà hàng ngon" })
    description: string;

    @ApiProperty({ example: 'https://images.foody.vn/res/g70/691971/s/foody-avatar-restaurant-coffee-691971-388-636424692593272480.jpg' })
    @IsNotEmpty()
    photo: string;

    auth:AuthPayload
}
