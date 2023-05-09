import { User } from "src/users/entities/User.entity";
import { OrderItem } from "src/order-item/entities/order-item.entity";
export declare class Order {
    id: string;
    user: User;
    orderItems: OrderItem[];
    totalAmount: number;
    status: string;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}
