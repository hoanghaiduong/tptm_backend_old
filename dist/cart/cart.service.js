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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const typeorm_2 = require("typeorm");
const product_service_1 = require("../product/product.service");
const users_service_1 = require("../users/users.service");
const User_entity_1 = require("../users/entities/User.entity");
let CartService = class CartService {
    constructor(cartRepository, productService, userService) {
        this.cartRepository = cartRepository;
        this.productService = productService;
        this.userService = userService;
    }
    async createOrGetCart(createCartDto) {
        const user = await this.userService.findById(createCartDto.auth.id);
        const existingCart = await this.cartRepository.findOne({
            where: { user: user.cart },
            relations: ['user', 'cartItems', 'cartItems.product']
        });
        if (existingCart) {
            return existingCart;
        }
        const newCart = new cart_entity_1.Cart();
        newCart.user = user;
        await this.cartRepository.save(newCart);
        return newCart;
    }
    async createOrGetCart2(createCartDto) {
        const user = await this.userService.findById(createCartDto.auth.id);
        const cart = await this.cartRepository.createQueryBuilder('cart')
            .leftJoinAndSelect('cart.user', 'user')
            .leftJoinAndSelect('cart.cartItems', 'cartItem')
            .leftJoinAndSelect('cartItem.product', 'product')
            .where('user.id = :userId', { userId: user.id })
            .getOne();
        if (cart) {
            return cart;
        }
        const newCart = new cart_entity_1.Cart();
        newCart.user = user;
        await this.cartRepository.save(newCart);
        return newCart;
    }
    async findAll() {
        const all = await this.cartRepository.find({
            relations: ['user', 'cartItems']
        });
        return { cart: all, count: all.length };
    }
    async findOne(id) {
        const user = await this.userService.findById(id);
        const cart = await this.cartRepository.findOne({
            where: { user: user.cart },
            relations: ['user', 'cartItems']
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        return cart;
    }
    async getCartByUser(user) {
        const cart = await this.cartRepository.findOne({
            where: { user: user.cart },
            relations: ['user', 'cartItems']
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        return cart;
    }
    async update(updateCartDto) {
    }
    remove(id) {
        return `This action removes a #${id} cart`;
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_service_1.ProductService,
        users_service_1.UsersService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map