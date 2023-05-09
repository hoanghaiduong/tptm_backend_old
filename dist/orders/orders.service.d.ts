import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductService } from 'src/product/product.service';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly userService;
    private readonly productService;
    constructor(orderRepository: Repository<Order>, userService: UsersService, productService: ProductService);
    create(createOrderDto: CreateOrderDto): Promise<Order | any>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: string): Promise<void>;
}
