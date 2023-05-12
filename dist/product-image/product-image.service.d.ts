import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';
export declare class ProductImageService {
    private _productImageRepository;
    constructor(_productImageRepository: Repository<ProductImage>);
    create(createProductImageDto: CreateProductImageDto): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProductImageDto: UpdateProductImageDto): string;
    remove(id: number): string;
}
