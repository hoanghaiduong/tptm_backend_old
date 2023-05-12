"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ReviewsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsModule = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
const reviews_controller_1 = require("./reviews.controller");
const typeorm_1 = require("@nestjs/typeorm");
const review_entity_1 = require("./entities/review.entity");
const product_service_1 = require("../product/product.service");
const product_entity_1 = require("../product/entities/product.entity");
const category_service_1 = require("../category/category.service");
const category_entity_1 = require("../category/entities/category.entity");
const restaurants_service_1 = require("../restaurants/restaurants.service");
const restaurant_entity_1 = require("../restaurants/entities/restaurant.entity");
const User_entity_1 = require("../users/entities/User.entity");
const users_service_1 = require("../users/users.service");
const product_image_entity_1 = require("../product-image/entities/product-image.entity");
let ReviewsModule = ReviewsModule_1 = class ReviewsModule {
};
ReviewsModule = ReviewsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([review_entity_1.Review, product_entity_1.Product, category_entity_1.Category, restaurant_entity_1.Restaurant, User_entity_1.User, product_image_entity_1.ProductImage])],
        controllers: [reviews_controller_1.ReviewsController],
        providers: [reviews_service_1.ReviewsService, product_service_1.ProductService, category_service_1.CategoryService, restaurants_service_1.RestaurantsService, users_service_1.UsersService],
        exports: [ReviewsModule_1, typeorm_1.TypeOrmModule]
    })
], ReviewsModule);
exports.ReviewsModule = ReviewsModule;
//# sourceMappingURL=reviews.module.js.map