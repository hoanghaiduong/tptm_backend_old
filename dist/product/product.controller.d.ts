/// <reference types="multer" />
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductsDto } from './dto/create-products.dto';
import { ProductStatus } from './enum/product.enum';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(req: any, createProductDto: CreateProductDto, files?: {
        photo?: Express.Multer.File[];
        images?: Express.Multer.File[];
    }): Promise<any>;
    addProducts(req: any, restaurantId: string, categoryId: string, statusProduct: ProductStatus, products: CreateProductsDto): Promise<void>;
    findAll(): Promise<{
        products: import("./entities/product.entity").Product[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    remove(id: string): Promise<Object>;
    initData(): Promise<import("./entities/product.entity").Product[]>;
}
