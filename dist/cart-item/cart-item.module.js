"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CartItemModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModule = void 0;
const common_1 = require("@nestjs/common");
const cart_item_service_1 = require("./cart-item.service");
const cart_item_controller_1 = require("./cart-item.controller");
const typeorm_1 = require("@nestjs/typeorm");
const cart_item_entity_1 = require("./entities/cart-item.entity");
const cart_service_1 = require("../cart/cart.service");
const users_service_1 = require("../users/users.service");
const product_service_1 = require("../product/product.service");
const category_service_1 = require("../category/category.service");
const cart_module_1 = require("../cart/cart.module");
const users_module_1 = require("../users/users.module");
const product_module_1 = require("../product/product.module");
const restaurants_module_1 = require("../restaurants/restaurants.module");
const restaurants_service_1 = require("../restaurants/restaurants.service");
const category_module_1 = require("../category/category.module");
const roles_module_1 = require("../roles/roles.module");
const roles_service_1 = require("../roles/roles.service");
const jwt_1 = require("@nestjs/jwt");
let CartItemModule = CartItemModule_1 = class CartItemModule {
};
CartItemModule = CartItemModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cart_item_entity_1.CartItem]),
            cart_module_1.CartModule,
            users_module_1.UsersModule,
            product_module_1.ProductModule,
            restaurants_module_1.RestaurantsModule,
            category_module_1.CategoryModule,
            roles_module_1.RolesModule
        ],
        controllers: [cart_item_controller_1.CartItemController],
        providers: [cart_item_service_1.CartItemService, cart_service_1.CartService, users_service_1.UsersService, product_service_1.ProductService, category_service_1.CategoryService, restaurants_service_1.RestaurantsService, roles_service_1.RolesService, jwt_1.JwtService],
        exports: [CartItemModule_1, typeorm_1.TypeOrmModule]
    })
], CartItemModule);
exports.CartItemModule = CartItemModule;
//# sourceMappingURL=cart-item.module.js.map