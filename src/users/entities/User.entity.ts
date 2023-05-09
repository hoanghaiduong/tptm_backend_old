
import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Entity, BeforeInsert, OneToMany, OneToOne } from 'typeorm';
import { Role } from '../../roles/entities/Role.entity';
import * as bcrypt from 'bcrypt';
import { GenderEnum } from '../enum/gender.enum';
import { Order } from 'src/orders/entities/order.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, length: 100 })
  first_name: string;
  @Column({ nullable: true, length: 100 })
  last_name: string;
  @Column({ nullable: false, length: 100, unique: true })
  email: string;
  @Column({ nullable: true, type: 'enum', enum: GenderEnum })
  gender: GenderEnum;
  @Column({ nullable: true, type: 'date' })
  birthday: Date;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: true, type: 'boolean', default: false })
  verified: boolean;
  @Column({ nullable: true, type: 'boolean', default: false })
  disabled: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
  async hashUpdatedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  @Column({ nullable: false, length: 100, unique: true })
  phoneNumber: string;

  @Column({ type: 'longtext', nullable: true })
  photo: string;
  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true })
  otpExpiration: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @Column({ name: 'roleId', nullable: true })
  roleId: string;

  @ManyToOne(() => Role, { eager: true, onDelete: 'SET NULL', onUpdate: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;


  @OneToMany(() => Order, (order) => order.user)
  orders: Order;

  @OneToMany(() => Review, review => review.user, { cascade: true })
  reviews: Review;
  @OneToOne(() => Cart, cart => cart.user, { nullable: true })
  cart: Cart;
  @OneToOne(() => Product, product => product.user, { nullable: true })
  product: Product;
}
