import { Product } from 'src/product/entities/product.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/User.entity';
export declare class Restaurant {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    photo: string;
    rating: number;
    description: string;
    user: User;
    reviews: Review[];
    products: Product[];
}
