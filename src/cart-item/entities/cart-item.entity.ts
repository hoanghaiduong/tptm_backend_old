import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Product, (product) => product.cartItems)
    product: Product;

    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    cart: Cart;

    @Column({ type: 'int' })
    quantity: number;
}
