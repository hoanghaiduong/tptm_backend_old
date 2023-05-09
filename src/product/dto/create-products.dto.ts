import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';
import { AuthPayload } from 'src/auth/interfaces/auth-payload.interface';

export class CreateProductsDto {
    auth: AuthPayload
    @ApiProperty({
        type: [Product],
        example: [
            {
                title: 'Product 1',
                subtitle: 'Product 1',
                price: 100,
                description: 'Product Description',
                photo: 'https://example.com/product.jpg',
                quantity: 10,
                releaseDate: '2022-01-01',
                isPopular: true,
                isFeatured: false,
       
             
            },
            {
                title: 'Product 2',
                subtitle: 'Product 2',
                price: 100,
                description: 'Product Description',
                photo: 'https://example.com/product.jpg',
                quantity: 10,
                releaseDate: '2022-01-01',
                isPopular: true,
                isFeatured: false,
             
            },
            {
                title: 'Product 3',
                subtitle: 'Product 3',
                price: 100,
                description: 'Product Description',
                photo: 'https://example.com/product.jpg',
                quantity: 10,
                releaseDate: '2022-01-01',
                isPopular: true,
                isFeatured: false,
            
            },
        ],
    })
    products: Product[];
    categoryId:string;
    restaurantId:string;
    status:string;
}
