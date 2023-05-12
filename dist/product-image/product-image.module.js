"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageModule = void 0;
const common_1 = require("@nestjs/common");
const product_image_service_1 = require("./product-image.service");
const product_image_controller_1 = require("./product-image.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_image_entity_1 = require("./entities/product-image.entity");
const jwt_1 = require("@nestjs/jwt");
let ProductImageModule = class ProductImageModule {
};
ProductImageModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_image_entity_1.ProductImage])],
        controllers: [product_image_controller_1.ProductImageController],
        providers: [product_image_service_1.ProductImageService, jwt_1.JwtService],
        exports: [product_image_service_1.ProductImageService, typeorm_1.TypeOrmModule]
    })
], ProductImageModule);
exports.ProductImageModule = ProductImageModule;
//# sourceMappingURL=product-image.module.js.map