import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
export declare class OrderItemService {
    private orderItemService;
    constructor(orderItemService: Repository<OrderItem>);
    create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): string;
    remove(id: number): string;
}
