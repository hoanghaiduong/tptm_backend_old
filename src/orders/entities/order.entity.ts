import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/users/entities/User.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { OrderStatus } from "../enum/order-status.enum";
import { PaymentMethod } from "../enum/order-payment.enum";
import { OrderItem } from "src/order-item/entities/order-item.entity";

@Entity()
export class Order {
  // Khai báo các trường khác ở đây
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Column({ nullable: true })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    nullable: true
  })
  status: string;

  @Column({ type: 'enum', nullable: true, enum: PaymentMethod, default: PaymentMethod.Home })
  paymentMethod: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

}
