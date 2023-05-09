import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartItemController {
    private readonly cartItemService;
    constructor(cartItemService: CartItemService);
    createOrUpdate(req: any, createCartItemDto: CreateCartItemDto, productId: string): Promise<any>;
    findAll(): Promise<import("./entities/cart-item.entity").CartItem[]>;
    findOne(id: string): Promise<import("./entities/cart-item.entity").CartItem>;
    update(id: string, updateCartItemDto: UpdateCartItemDto): Promise<import("./entities/cart-item.entity").CartItem>;
    remove(id: string): Promise<Object>;
}
