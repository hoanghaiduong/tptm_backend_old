import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { CategoryService } from 'src/category/category.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { UsersService } from 'src/users/users.service';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
export declare class ProductService {
    private readonly productRepository;
    private CategoriesService;
    private restaurantService;
    private userService;
    private dataSource;
    private _productImageRepository;
    constructor(productRepository: Repository<Product>, CategoriesService: CategoryService, restaurantService: RestaurantsService, userService: UsersService, dataSource: DataSource, _productImageRepository: Repository<ProductImage>);
    intiProducts(): Promise<Product[]>;
    findAll(page?: number, limit?: number): Promise<{
        products: Product[];
        total: number;
    }>;
    findOneWithCartItems(id: string): Promise<Product>;
    findOne(id: string): Promise<Product>;
    findByIds(id: string[]): Promise<{
        products: Product[];
        count: number;
    }>;
    addProducts(products: CreateProductsDto): Promise<void | any>;
    create(productDto: CreateProductDto): Promise<Product | any>;
    remove(id: string): Promise<Object>;
}
