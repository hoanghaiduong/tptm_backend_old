import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Product, product => product.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
    product: Product;

    @Column()
    imageUrl: string;

    @Column({ nullable: true })
    caption: string;
    
    @Column({ nullable: true })
    description: string;
}