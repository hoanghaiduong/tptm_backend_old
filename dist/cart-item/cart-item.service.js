"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_item_entity_1 = require("./entities/cart-item.entity");
const typeorm_2 = require("typeorm");
const cart_service_1 = require("../cart/cart.service");
const product_service_1 = require("../product/product.service");
const users_service_1 = require("../users/users.service");
const User_entity_1 = require("../users/entities/User.entity");
const product_entity_1 = require("../product/entities/product.entity");
let CartItemService = class CartItemService {
    constructor(cartItemRepository, cartService, productService, userService) {
        this.cartItemRepository = cartItemRepository;
        this.cartService = cartService;
        this.productService = productService;
        this.userService = userService;
    }
    async createOrUpdate(createCartItemDto) {
        const user = await this.userService.findById(createCartItemDto.auth.id);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const [cart, product] = await Promise.all([
            this.cartService.getCartByUser(user),
            this.productService.findOne(createCartItemDto.productId)
        ]);
        if (!cart) {
            throw new common_1.NotFoundException("CART NOT FOUND IN user");
        }
        if (!product) {
            throw new common_1.NotFoundException("PRODUCT NOT FOUND");
        }
        let cartItem = (await this.findAll()).find((item) => item.product.id === product.id);
        if (createCartItemDto.quantity < 0) {
            if (cartItem) {
                await this.cartItemRepository.remove(cartItem);
                cart.cartItems = cart.cartItems.filter((item) => item.id !== cartItem.id);
                await this.cartItemRepository.save(cart);
            }
            throw new common_1.BadRequestException('Invalid cart item quantity');
        }
        if (cartItem) {
            cartItem.quantity = createCartItemDto.quantity;
            cartItem = await this.cartItemRepository.save(cartItem);
        }
        else {
            console.log("create cart item new cart item");
            cartItem = await this.cartItemRepository.create(Object.assign(Object.assign({}, createCartItemDto), { product,
                cart }));
            cart.cartItems.push(cartItem);
            await this.cartItemRepository.save(cartItem);
        }
        return cartItem;
    }
    async create(createCartItemDto) {
        const user = await this.userService.findById(createCartItemDto.auth.id);
        const cartItem = await this.cartService.getCartByUser(user);
        const product = await this.productService.findOne(createCartItemDto.productId);
        const created = await this.cartItemRepository.create(Object.assign(Object.assign({}, createCartItemDto), { product: product, cart: cartItem }));
        if (!created) {
            throw new common_1.BadRequestException("CREATE cart item failed");
        }
        return await this.cartItemRepository.save(created);
    }
    async findAll() {
        return await this.cartItemRepository.find({
            relations: ['product']
        });
    }
    async findOne(id) {
        const cartItem = this.cartItemRepository.findOne({
            where: { id },
            relations: ['product']
        });
        if (!cartItem) {
            throw new common_1.NotFoundException("Cart item not found");
        }
        return cartItem;
    }
    async update(id, updateCartItemDto) {
        const cartItem = await this.findOne(id);
        const merged = await this.cartItemRepository.merge(cartItem, updateCartItemDto);
        if (updateCartItemDto.quantity) {
            merged.quantity = updateCartItemDto.quantity;
        }
        const updatedCartItem = await this.cartItemRepository.save(merged);
        if (!updatedCartItem) {
            throw new common_1.BadRequestException("Update cart item failed");
        }
        return updatedCartItem;
    }
    async remove(id) {
        await this.cartItemRepository.delete(id);
    }
};
CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cart_service_1.CartService,
        product_service_1.ProductService,
        users_service_1.UsersService])
], CartItemService);
exports.CartItemService = CartItemService;
//# sourceMappingURL=cart-item.service.js.map