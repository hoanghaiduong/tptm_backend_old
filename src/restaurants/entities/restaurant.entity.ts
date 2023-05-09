import { Product } from 'src/product/entities/product.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/User.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';


@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    address: string;
    @Column({
        type:'double'
    })
    lat: number;
    @Column({
        type:'double'
    })
    lng: number;
    @Column({ type: 'longtext' })
    photo: string;

    @Column({ type: 'int', default: 0, nullable: true })
    rating: number;
    @Column({type:'longtext',nullable:true})
    description: string;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => Review, review => review.restaurant, { onDelete: 'SET NULL', onUpdate: 'CASCADE', nullable: true })
    reviews: Review[];
    @OneToMany(() => Product, product => product.restaurant, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    products: Product[];

}
