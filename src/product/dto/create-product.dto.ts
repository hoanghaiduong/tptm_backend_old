import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ProductStatus } from '../enum/product.enum';
import { AuthPayload } from 'src/auth/interfaces/auth-payload.interface';
import { ProductImage } from 'src/product-image/entities/product-image.entity';

export class CreateProductDto {
  auth: AuthPayload
 
  @IsNotEmpty()
  @IsString()
  title: string;

  
  subtitle?: string;

  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'Product Description',
    description: 'The description of the product',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

 
  photo: string;

 
  quantity: number;

 
  releaseDate?: string;


  status:  string;

  isPopular: boolean;

 
  isFeatured: boolean;


  categoryId: string;
  restaurantId: string;

  // images: ProductImage[];
  images: string[]


}
