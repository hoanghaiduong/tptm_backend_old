import { Product } from "src/product/entities/product.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { User } from "src/users/entities/User.entity";
export declare class Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    product: Product;
    restaurant: Restaurant;
}
