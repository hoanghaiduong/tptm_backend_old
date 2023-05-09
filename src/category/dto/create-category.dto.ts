import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  
  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
    required: true,
    uniqueItems:true
  })
  name: string;

  @ApiProperty({
    example: 'https://example.com/images/electronics.jpg',
    description: 'The URL of the photo associated with the category',
    required: false,
  })
  photo?: string;
}
