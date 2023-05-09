import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductStatus } from './enum/product.enum';
import { CategoryService } from 'src/category/category.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { UsersService } from 'src/users/users.service';
export declare class ProductService {
    private readonly productRepository;
    private CategoriesService;
    private restaurantService;
    private userService;
    private dataSource;
    constructor(productRepository: Repository<Product>, CategoriesService: CategoryService, restaurantService: RestaurantsService, userService: UsersService, dataSource: DataSource);
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
    create(productDto: CreateProductDto, categoryId: string, restaurantId: string, productStatus: ProductStatus): Promise<Product>;
    update(id: string, productDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<Object>;
}
