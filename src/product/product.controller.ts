import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductStatus } from './enum/product.enum';
import { IsNotEmpty } from 'class-validator';
import { CreateProductsDto } from './dto/create-products.dto';
import { RolesGuard } from 'src/auth/jwt/Role.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('product')
@ApiTags('Product')
// @UseGuards(RolesGuard)

// @ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @ApiQuery({
    name: 'status',
    enumName: 'status',
    description: 'The status of the product',
    enum: ProductStatus,
    required: true,
  })
  @ApiQuery({
    name: 'categoryId',
    required: true,
  },
  )
 
  @ApiQuery({
    name: 'restaurantId',
    required: true,
  })
  @Roles('ADMIN','RESTAURANT')
  @Post('create')
  create(@Req() req,@Body() createProductDto: CreateProductDto, @Query('categoryId') categoryId: string, @Query('restaurantId') restaurantId: string, @Query('status') statusProduct: ProductStatus) {
    
    return this.productService.create({
      ...createProductDto,
      auth:req.user
    }, categoryId, restaurantId, statusProduct);
  }
  @Roles('ADMIN','RESTAURANT')
  @Post('create-mutiple-products')
  @ApiQuery({
    name:'restaurantId',
  })
  @ApiQuery({
    name:'categoryId',
  })
  @ApiQuery({
    name: 'status',
    enumName: 'status',
    description: 'The status of the product',
    enum: ProductStatus,
    required: true,
  })
  async addProducts(@Req() req,@Query('restaurantId') restaurantId:string,@Query('categoryId') categoryId:string,@Query('status') statusProduct: ProductStatus,@Body() products:CreateProductsDto): Promise<void> {
    return await this.productService.addProducts({
      ...products,
      auth:req.user,
      categoryId,
      restaurantId,
      status:statusProduct
      
    });
  }
  @Get('gets')

  findAll() {
    return this.productService.findAll();
  }
  
  @Get('get')
  findOne(@Query('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch('update')
  @Roles('ADMIN','RESTAURANT')
  update(@Req() req,@Query('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('delete')
  @Roles('ADMIN','RESTAURANT')
  remove(@Query('id') id: string) {
    return this.productService.remove(id);
  }
  @Post('initProduct')
  async initData()
  {
    return await this.productService.intiProducts();
  }
}
