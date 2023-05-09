import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
export declare class CartItemService {
    private readonly cartItemRepository;
    private readonly cartService;
    private readonly productService;
    private readonly userService;
    constructor(cartItemRepository: Repository<CartItem>, cartService: CartService, productService: ProductService, userService: UsersService);
    createOrUpdate(createCartItemDto: CreateCartItemDto): Promise<CartItem | any>;
    create(createCartItemDto: CreateCartItemDto): Promise<CartItem>;
    findAll(): Promise<CartItem[]>;
    findOne(id: string): Promise<CartItem>;
    update(id: string, updateCartItemDto: UpdateCartItemDto): Promise<CartItem>;
    remove(id: string): Promise<void>;
}
