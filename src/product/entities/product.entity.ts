import { Category } from "src/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductStatus } from "../enum/product.enum";

import { Order } from "src/orders/entities/order.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { Review } from "src/reviews/entities/review.entity";
import { User } from "src/users/entities/User.entity";
import { OrderItem } from "src/order-item/entities/order-item.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { CartItem } from "src/cart-item/entities/cart-item.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    title: string;

    @Column()
    subtitle: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: true, type: "longtext" })
    photo: string;

    @Column({ nullable: true })
    quantity: number;

    @Column({ type: 'date' ,nullable:true})
    releaseDate: string;

    @Column({ nullable: true })
    status: string;

    @Column({ default: true, nullable: true })
    isPopular: boolean;

    @Column({ default: true, nullable: true })
    isFeatured: boolean;

    @Column({ nullable: true })
    type: string;
    @Column({nullable: true })
    dvt:string;

    @ManyToOne(() => Category, category => category.products, { nullable: true })
    @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
    category: Category;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product,{nullable:true})
    orderItems: OrderItem[];


    @ManyToOne(() => User, { eager: true, nullable: true })
    user: User;

    @OneToMany(() => Review, review => review.product, { cascade: true, nullable: true  })
    reviews: Review[];


    @ManyToOne(() => Restaurant, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({
        name: 'restaurantId',
    })
    restaurant: Restaurant;

    @OneToMany(() => CartItem, (cartItem) => cartItem.product, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
       nullable: true 
    })
    cartItems: CartItem[];
}

