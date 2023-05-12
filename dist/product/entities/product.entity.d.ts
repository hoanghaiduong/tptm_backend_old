import { Category } from "src/category/entities/category.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { Review } from "src/reviews/entities/review.entity";
import { User } from "src/users/entities/User.entity";
import { OrderItem } from "src/order-item/entities/order-item.entity";
import { CartItem } from "src/cart-item/entities/cart-item.entity";
import { ProductImage } from "src/product-image/entities/product-image.entity";
export declare class Product {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    description: string;
    photo: string;
    images: ProductImage[];
    quantity: number;
    releaseDate: string;
    status: string;
    isPopular: boolean;
    isFeatured: boolean;
    type: string;
    dvt: string;
    category: Category;
    orderItems: OrderItem[];
    user: User;
    reviews: Review[];
    restaurant: Restaurant;
    cartItems: CartItem[];
}
