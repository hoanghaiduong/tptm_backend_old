import { Product } from "src/product/entities/product.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { User } from "src/users/entities/User.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rating: number;

    @Column({ nullable: true })
    comment: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    @ManyToOne(() => User, { eager: true })
    user: User;

    @ManyToOne(() => Product, { eager: true, nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({
        name: 'productId',
    })
    product: Product;

    @ManyToOne(() => Restaurant, { eager: true, nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({
        name: 'restaurantId',
    })
    restaurant: Restaurant;
}
