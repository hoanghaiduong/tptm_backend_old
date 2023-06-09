import { Role } from '../../roles/entities/Role.entity';
import { GenderEnum } from '../enum/gender.enum';
import { Order } from 'src/orders/entities/order.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
export declare class User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: GenderEnum;
    birthday: Date;
    password: string;
    verified: boolean;
    disabled: boolean;
    hashPassword(): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
    hashUpdatedPassword(password: string): Promise<string>;
    phoneNumber: string;
    photo: string;
    otp: string;
    otpExpiration: Date;
    createdAt: Date;
    updatedAt: Date;
    roleId: string;
    role: Role;
    orders: Order;
    reviews: Review;
    cart: Cart;
    product: Product;
}
