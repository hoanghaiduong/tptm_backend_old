import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/product/entities/product.entity";
export declare class CartItem {
    id: string;
    product: Product;
    cart: Cart;
    quantity: number;
}
