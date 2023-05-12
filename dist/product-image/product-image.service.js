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
exports.ProductImageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_image_entity_1 = require("./entities/product-image.entity");
const typeorm_2 = require("typeorm");
let ProductImageService = class ProductImageService {
    constructor(_productImageRepository) {
        this._productImageRepository = _productImageRepository;
    }
    async create(createProductImageDto) {
        const createProductImage = await this._productImageRepository.create(createProductImageDto);
        const saved = await this._productImageRepository.save(createProductImage);
    }
    findAll() {
        return `This action returns all productImage`;
    }
    findOne(id) {
        return `This action returns a #${id} productImage`;
    }
    update(id, updateProductImageDto) {
        return `This action updates a #${id} productImage`;
    }
    remove(id) {
        return `This action removes a #${id} productImage`;
    }
};
ProductImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_image_entity_1.ProductImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductImageService);
exports.ProductImageService = ProductImageService;
//# sourceMappingURL=product-image.service.js.map