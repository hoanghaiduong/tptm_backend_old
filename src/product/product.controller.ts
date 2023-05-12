import { Body, Controller, Delete, Get, Post, Query, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs/promises';
import { Roles } from 'src/roles/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductsDto } from './dto/create-products.dto';
import { ProductStatus } from './enum/product.enum';
import { ProductService } from './product.service';
import { Request } from 'express';
@Controller('product')
@ApiTags('Product')
// @UseGuards(RolesGuard)

// @ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Roles('ADMIN', 'RESTAURANT')
  @Post('create')
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        categoryId: {
          type: 'string',
          example: 'categoryId',
        },
        restaurantId: {
          type: 'string',
          example: 'restaurantId',
        },
        title: {
          type: 'string',
          example: 'Product title'
        },
        subtitle: {
          type: 'string',
          example: 'Product subtitle'
        },
        description: {
          type: 'string',
          example: 'DESCRIPTION PRODUCT'
        },
        price: {
          type: 'double',
          example: 14.67
        },
        quantity: {
          type: 'integer',
          example: 99
        },
        isPopular: {
          type: 'boolean',
          example: true
        },
        isFeatured: {
          type: 'boolean',
          example: true
        },
        status: {
          type: 'string',
          enum: Object.values(ProductStatus),
          example: ProductStatus.AVAILABLE
        },
        photo: {
          type: 'string',
          format: 'binary',
        },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })


  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 5 },
    { name: 'photo', maxCount: 1 },
  ],
    {
      storage: diskStorage({
        destination: 'public/uploads/product',
        filename: (req: Request, file, callback) => {

          let name = `${Date.now()}-unknown`;
          if (file.originalname && typeof file.originalname === 'string') {
            name = `${Date.now()}-${path.parse(file.originalname).name}`;
          }
          const extension = path.parse(file.originalname || '').ext;
          const fileName = `${name}${extension}`;
          console.log("Uploading...");
          callback(null, fileName);

        },
      }),
    },

  ))

  async create(@Req() req, @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files?: {
      photo?: Express.Multer.File[],
      images?: Express.Multer.File[]
    }
  ) {
    // Access the file(s) if they exist
    const photo = files?.photo?.[0];
    const images = files?.images;

    
    const filePath = `uploads/product/${photo.filename}`;
    const filesPath = images.map(file => `uploads/product/${file.filename}`);
   
    return this.productService.create({
      ...createProductDto,
      auth: req.user,
      photo:filePath,
      images:filesPath,
    });

  }



  //---------------------------------------------------------------//

  @Roles('ADMIN', 'RESTAURANT')
  @Post('create-mutiple-products')
  @ApiQuery({
    name: 'restaurantId',
  })
  @ApiQuery({
    name: 'categoryId',
  })
  @ApiQuery({
    name: 'status',
    enumName: 'status',
    description: 'The status of the product',
    enum: ProductStatus,
    required: true,
  })

  async addProducts(@Req() req, @Query('restaurantId') restaurantId: string, @Query('categoryId') categoryId: string, @Query('status') statusProduct: ProductStatus, @Body() products: CreateProductsDto): Promise<void> {
    return await this.productService.addProducts({
      ...products,
      auth: req.user,
      categoryId,
      restaurantId,
      status: statusProduct

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

  // @Patch('update')
  // @Roles('ADMIN', 'RESTAURANT')
  // update(@Req() req, @Query('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(id, updateProductDto);
  // }

  @Delete('delete')
  @Roles('ADMIN', 'RESTAURANT')
  remove(@Query('id') id: string) {
    return this.productService.remove(id);
  }
  @Post('initProduct')
  async initData() {
    return await this.productService.intiProducts();
  }
}
