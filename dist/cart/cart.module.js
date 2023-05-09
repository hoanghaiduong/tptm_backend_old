"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CartModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const cart_controller_1 = require("./cart.controller");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const roles_service_1 = require("../roles/roles.service");
const roles_module_1 = require("../roles/roles.module");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
const product_service_1 = require("../product/product.service");
const product_module_1 = require("../product/product.module");
const category_service_1 = require("../category/category.service");
const category_module_1 = require("../category/category.module");
const restaurants_service_1 = require("../restaurants/restaurants.service");
const restaurants_module_1 = require("../restaurants/restaurants.module");
let CartModule = CartModule_1 = class CartModule {
};
CartModule = CartModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cart_entity_1.Cart]),
            roles_module_1.RolesModule, users_module_1.UsersModule, product_module_1.ProductModule, category_module_1.CategoryModule, restaurants_module_1.RestaurantsModule],
        controllers: [cart_controller_1.CartController],
        providers: [cart_service_1.CartService, roles_service_1.RolesService, jwt_1.JwtService, users_service_1.UsersService, product_service_1.ProductService, category_service_1.CategoryService, restaurants_service_1.RestaurantsService],
        exports: [CartModule_1, typeorm_1.TypeOrmModule]
    })
], CartModule);
exports.CartModule = CartModule;
//# sourceMappingURL=cart.module.js.map