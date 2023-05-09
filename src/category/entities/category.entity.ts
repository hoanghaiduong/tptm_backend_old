import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'nvarchar', nullable: false,unique:true})
    name: string;

    @Column({ type: 'varchar', nullable: false })
    photo: string;

    @OneToMany(() => Product, product => product.category)
    products: Product;
}
