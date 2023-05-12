"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const category_module_1 = require("./category/category.module");
const ConfigModule_1 = require("./config/ConfigModule");
const product_module_1 = require("./product/product.module");
const roles_module_1 = require("./roles/roles.module");
const users_module_1 = require("./users/users.module");
const cart_item_module_1 = require("./cart-item/cart-item.module");
const cart_module_1 = require("./cart/cart.module");
const files_module_1 = require("./files/files.module");
const maps_module_1 = require("./maps/maps.module");
const order_item_module_1 = require("./order-item/order-item.module");
const orders_module_1 = require("./orders/orders.module");
const product_image_module_1 = require("./product-image/product-image.module");
const restaurants_module_1 = require("./restaurants/restaurants.module");
const reviews_module_1 = require("./reviews/reviews.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ConfigModule_1.ConfigModule, auth_module_1.AuthModule, users_module_1.UsersModule, roles_module_1.RolesModule, product_module_1.ProductModule, category_module_1.CategoryModule, orders_module_1.OrdersModule, files_module_1.FilesModule, restaurants_module_1.RestaurantsModule, reviews_module_1.ReviewsModule, maps_module_1.MapsModule, order_item_module_1.OrderItemModule, cart_module_1.CartModule, cart_item_module_1.CartItemModule, product_image_module_1.ProductImageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map