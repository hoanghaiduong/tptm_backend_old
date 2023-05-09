import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UsersService } from 'src/users/users.service';
export declare class RestaurantsService {
    private readonly restaurantRepository;
    private readonly usersService;
    constructor(restaurantRepository: Repository<Restaurant>, usersService: UsersService);
    getAllRestaurantsAndProduct(): Promise<Restaurant[]>;
    findProductsByRestaurant(id: string): Promise<import("../product/entities/product.entity").Product[]>;
    initData(): Promise<Restaurant[]>;
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    findOne(id: string): Promise<Restaurant>;
    findOneWithAllProduct(id: string): Promise<Restaurant>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    response(id: number, message: string, status: string): Promise<Object>;
    remove(id: string): Promise<Object>;
}
