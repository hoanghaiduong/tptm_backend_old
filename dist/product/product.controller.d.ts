import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductStatus } from './enum/product.enum';
import { CreateProductsDto } from './dto/create-products.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(req: any, createProductDto: CreateProductDto, categoryId: string, restaurantId: string, statusProduct: ProductStatus): Promise<import("./entities/product.entity").Product>;
    addProducts(req: any, restaurantId: string, categoryId: string, statusProduct: ProductStatus, products: CreateProductsDto): Promise<void>;
    findAll(): Promise<{
        products: import("./entities/product.entity").Product[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    update(req: any, id: string, updateProductDto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    remove(id: string): Promise<Object>;
    initData(): Promise<import("./entities/product.entity").Product[]>;
}
