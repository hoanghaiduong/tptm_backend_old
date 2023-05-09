import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/User.entity';
export declare class CartService {
    private cartRepository;
    private productService;
    private userService;
    constructor(cartRepository: Repository<Cart>, productService: ProductService, userService: UsersService);
    createOrGetCart(createCartDto: CreateCartDto): Promise<Cart>;
    createOrGetCart2(createCartDto: CreateCartDto): Promise<Cart>;
    findAll(): Promise<{
        cart: Cart[];
        count: number;
    }>;
    findOne(id: string): Promise<Cart>;
    getCartByUser(user: User): Promise<Cart>;
    update(updateCartDto: UpdateCartDto): Promise<void>;
    remove(id: string): string;
}
