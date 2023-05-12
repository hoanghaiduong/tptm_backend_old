import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private _productImageRepository: Repository<ProductImage>
  ) { }
  async create(createProductImageDto: CreateProductImageDto) {
    const createProductImage = await this._productImageRepository.create(createProductImageDto);
    const saved = await this._productImageRepository.save(createProductImage);
  }

  findAll() {
    return `This action returns all productImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productImage`;
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    return `This action updates a #${id} productImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productImage`;
  }
}
