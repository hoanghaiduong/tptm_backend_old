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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const User_entity_1 = require("../users/entities/User.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../product/entities/product.entity");
const users_service_1 = require("../users/users.service");
const product_service_1 = require("../product/product.service");
let OrdersService = class OrdersService {
    constructor(orderRepository, userService, productService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.productService = productService;
    }
    async create(createOrderDto) {
        const user = await this.userService.findById(createOrderDto.auth.id);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user.cart;
    }
    async findAll() {
        return await this.orderRepository.find();
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id }
        });
        if (!order) {
            throw new common_1.NotFoundException("ORDER NOT FOUND");
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        const merge = await this.orderRepository.merge(order, updateOrderDto);
        if (!merge) {
            throw new common_1.BadRequestException("Merge Failed");
        }
        const update = await this.orderRepository.update(id, merge);
        if (!update) {
            throw new common_1.BadRequestException("Update Failed");
        }
        return merge;
    }
    async remove(id) {
        await this.findOne(id);
        await this.orderRepository.delete(id);
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        product_service_1.ProductService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map