import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ProductStatus } from '../enum/product.enum';
import { AuthPayload } from 'src/auth/interfaces/auth-payload.interface';

export class CreateProductDto {
  auth:AuthPayload
  @ApiProperty({
    example: 'Product Title',
    description: 'The title of the product',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Product Subtitle',
    description: 'The subtitle of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({
    example: 100.0,
    description: 'The price of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'Product Description',
    description: 'The description of the product',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://example.com/product.jpg',
    description: 'The URL of the product photo',
  })
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ApiProperty({
    example: 10,
    description: 'The quantity of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: '2022-01-01',
    description: 'The release date of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  releaseDate?: string;

  // @ApiProperty({
  //   enum: ProductStatus,
  //   example: ProductStatus.AVAILABLE,
  //   description: 'The status of the product',
  // })
  // // @IsEnum(ProductStatus)
  // // @IsNotEmpty()
  // // status: ProductStatus;

  status: null | string;

  @ApiProperty({
    example: true,
    description: 'Whether the product is popular or not',
  })
  @IsBoolean()
  isPopular: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the product is featured or not',
  })
  @IsBoolean()
  isFeatured: boolean;

 
  categoryId:  string;
  restaurantId: string;




}
