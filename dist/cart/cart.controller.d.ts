import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    createORgetCart(req: any, createCartDto: CreateCartDto): Promise<import("./entities/cart.entity").Cart>;
    findAll(): Promise<{
        cart: import("./entities/cart.entity").Cart[];
        count: number;
    }>;
}
