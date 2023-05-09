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
exports.CreateProductsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const product_entity_1 = require("../entities/product.entity");
const auth_payload_interface_1 = require("../../auth/interfaces/auth-payload.interface");
class CreateProductsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [product_entity_1.Product],
        example: [
            {
                title: 'Product 1',
                subtitle: 'Product 1',
                price: 100,
                description: 'Product Description',
                photo: 'https://example.com/product.jpg',
                quantity: 10,
                releaseDate: '2022-01-01',
                isPopular: true,
                isFeatured: false,
            },
            {
                title: 'Product 2',
                subtitle: 'Product 2',
                price: 100,
                description: 'Product Description',
                photo: 'https://example.com/product.jpg',
                quantity: 10,
                releaseDate: '2022-01-01',
                isPopular: true,
                isFeatured: false,
            },
            {
                title: 'Product 3',
                subtitle: 'Product 3',
                price: 100,
                description: 'Product Description',
                photo: 'https://example.com/product.jpg',
                quantity: 10,
                releaseDate: '2022-01-01',
                isPopular: true,
                isFeatured: false,
            },
        ],
    }),
    __metadata("design:type", Array)
], CreateProductsDto.prototype, "products", void 0);
exports.CreateProductsDto = CreateProductsDto;
//# sourceMappingURL=create-products.dto.js.map