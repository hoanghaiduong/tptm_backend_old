import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    initData(): Promise<Restaurant[]>;
    create(req: any, createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    getAllRestaurantsAndProduct(): Promise<Restaurant[]>;
    findOne(id: string): Promise<Restaurant>;
    update(req: any, id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    remove(id: string): Promise<Object>;
    getProductByRestaurant(id: string): Promise<import("../product/entities/product.entity").Product[]>;
}
