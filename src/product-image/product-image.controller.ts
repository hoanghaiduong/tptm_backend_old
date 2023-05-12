import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, BadRequestException, UseGuards } from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { RolesGuard } from 'src/auth/jwt/Role.guard';
import { AuthGuard } from 'src/auth/jwt/auth.guard';

@Controller('product-image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('upload-multiple-images-product')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images', 5, {
    fileFilter(req, file, callback) {
      const allowedTypes = [
        'image/jpeg', 'image/png'
      ]
      const isValid = allowedTypes.includes(file.mimetype);
      callback(null, isValid);
    },
    storage: diskStorage({
      destination: `src/product/images`,
      filename: async (req, file, callback) => {
        const uid = req['uid'];
        const { productId } = req.query;

        if (uid && productId) {
          let name = `${uid}_${productId}-unknown`;
          if (file.originalname && typeof file.originalname === 'string') {
            name = `${uid}_${productId}-${path.parse(file.originalname).name}`;
          }
          const extension = path.parse(file.originalname || '').ext;
          const filePath = path.join(`src/files/uploads`, `${name}${extension}`);
          if (fs.existsSync(filePath)) {
            console.log("file already exists! deleting...")
            fs.unlinkSync(filePath);
            console.log("Deleted!");
          }

          console.log("Uploading...");
          callback(null, `${name}${extension}`);
        }
        else {
          callback(new BadRequestException("Invalid user or product"), null)
        }
      },
    })
  }))
  @ApiResponse({ status: 200, description: 'Files uploaded successfully' })
  async uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>): Promise<any> {
    try {

      const filesPath = files.map(file => `src/product/images/${file.filename}`);
      return { message: 'Files uploaded successfully', files: filesPath };
    } catch (error) {
      throw new BadRequestException("Error uploading files" + error.message)
    }
  }

  @Post()
  create(@Body() createProductImageDto: CreateProductImageDto) {
    return this.productImageService.create(createProductImageDto);
  }

  @Get()
  findAll() {
    return this.productImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductImageDto: UpdateProductImageDto) {
    return this.productImageService.update(+id, updateProductImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productImageService.remove(+id);
  }
}
