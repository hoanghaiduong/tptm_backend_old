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
exports.CartItemController = void 0;
const common_1 = require("@nestjs/common");
const cart_item_service_1 = require("./cart-item.service");
const create_cart_item_dto_1 = require("./dto/create-cart-item.dto");
const update_cart_item_dto_1 = require("./dto/update-cart-item.dto");
const swagger_1 = require("@nestjs/swagger");
const Role_guard_1 = require("../auth/jwt/Role.guard");
const roles_decorator_1 = require("../roles/roles.decorator");
let CartItemController = class CartItemController {
    constructor(cartItemService) {
        this.cartItemService = cartItemService;
    }
    async createOrUpdate(req, createCartItemDto, productId) {
        return await this.cartItemService.createOrUpdate(Object.assign(Object.assign({}, createCartItemDto), { productId, auth: req.user }));
    }
    findAll() {
        return this.cartItemService.findAll();
    }
    findOne(id) {
        return this.cartItemService.findOne(id);
    }
    update(id, updateCartItemDto) {
        return this.cartItemService.update(id, updateCartItemDto);
    }
    async remove(id) {
        await this.cartItemService.remove(id);
        return {
            status: 'success',
            message: 'Cart item deleted successfully '
        };
    }
};
__decorate([
    (0, common_1.Post)('createOrUpdate'),
    (0, swagger_1.ApiQuery)({
        name: 'productId',
        required: true
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_cart_item_dto_1.CreateCartItemDto, String]),
    __metadata("design:returntype", Promise)
], CartItemController.prototype, "createOrUpdate", null);
__decorate([
    (0, common_1.Get)('get-items-cart'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('get-item-cart'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update-item-cart'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cart_item_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete-item-cart'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartItemController.prototype, "remove", null);
CartItemController = __decorate([
    (0, common_1.UseGuards)(Role_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('USER', 'FARM'),
    (0, common_1.Controller)('cart-item'),
    (0, swagger_1.ApiTags)("CART ITEM"),
    __metadata("design:paramtypes", [cart_item_service_1.CartItemService])
], CartItemController);
exports.CartItemController = CartItemController;
//# sourceMappingURL=cart-item.controller.js.map