import { CartItem } from "src/cart-item/entities/cart-item.entity";
import { User } from "src/users/entities/User.entity";
export declare class Cart {
    id: string;
    user: User;
    cartItems: CartItem[];
}
