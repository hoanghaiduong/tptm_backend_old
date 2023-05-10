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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const product_entity_1 = require("../../product/entities/product.entity");
const restaurant_entity_1 = require("../../restaurants/entities/restaurant.entity");
const User_entity_1 = require("../../users/entities/User.entity");
const typeorm_1 = require("typeorm");
let Review = class Review {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'longtext' }),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'longtext',
    }),
    __metadata("design:type", String)
], Review.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Review.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Review.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, { eager: true }),
    __metadata("design:type", User_entity_1.User)
], Review.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { eager: true, nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({
        name: 'productId',
    }),
    __metadata("design:type", product_entity_1.Product)
], Review.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.Restaurant, { eager: true, nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({
        name: 'restaurantId',
    }),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], Review.prototype, "restaurant", void 0);
Review = __decorate([
    (0, typeorm_1.Entity)()
], Review);
exports.Review = Review;
//# sourceMappingURL=review.entity.js.map