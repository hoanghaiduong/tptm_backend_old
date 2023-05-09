import { Product } from "src/product/entities/product.entity";
import { Order } from "src/orders/entities/order.entity";
export declare class OrderItem {
    id: string;
    order: Order;
    product: Product;
    quantity: number;
    price: number;
}
