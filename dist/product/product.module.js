"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const category_module_1 = require("../category/category.module");
const category_service_1 = require("../category/category.service");
const restaurants_service_1 = require("../restaurants/restaurants.service");
const category_entity_1 = require("../category/entities/category.entity");
const restaurant_entity_1 = require("../restaurants/entities/restaurant.entity");
const restaurants_module_1 = require("../restaurants/restaurants.module");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
const roles_service_1 = require("../roles/roles.service");
const roles_module_1 = require("../roles/roles.module");
const jwt_1 = require("@nestjs/jwt");
let ProductModule = ProductModule_1 = class ProductModule {
};
ProductModule = ProductModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),
            category_module_1.CategoryModule,
            restaurants_module_1.RestaurantsModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, category_service_1.CategoryService, restaurants_service_1.RestaurantsService, users_service_1.UsersService, roles_service_1.RolesService, jwt_1.JwtService],
        exports: [ProductModule_1, typeorm_1.TypeOrmModule]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map