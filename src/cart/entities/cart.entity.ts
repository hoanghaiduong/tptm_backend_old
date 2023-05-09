import { CartItem } from "src/cart-item/entities/cart-item.entity";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/users/entities/User.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @OneToOne(() => User, user => user.cart)
    @JoinColumn(
        {
            name: 'userId'
        }
    )
    user: User;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
        eager: true,
        cascade: true,
    })
    cartItems: CartItem[];
}
