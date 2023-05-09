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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const swagger_1 = require("@nestjs/swagger");
const product_enum_1 = require("./enum/product.enum");
const create_products_dto_1 = require("./dto/create-products.dto");
const Role_guard_1 = require("../auth/jwt/Role.guard");
const roles_decorator_1 = require("../roles/roles.decorator");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    create(req, createProductDto, categoryId, restaurantId, statusProduct) {
        return this.productService.create(Object.assign(Object.assign({}, createProductDto), { auth: req.user }), categoryId, restaurantId, statusProduct);
    }
    async addProducts(req, restaurantId, categoryId, statusProduct, products) {
        return await this.productService.addProducts(Object.assign(Object.assign({}, products), { auth: req.user, categoryId,
            restaurantId, status: statusProduct }));
    }
    findAll() {
        return this.productService.findAll();
    }
    findOne(id) {
        return this.productService.findOne(id);
    }
    update(req, id, updateProductDto) {
        return this.productService.update(id, updateProductDto);
    }
    remove(id) {
        return this.productService.remove(id);
    }
    async initData() {
        return await this.productService.intiProducts();
    }
};
__decorate([
    (0, swagger_1.ApiQuery)({
        name: 'status',
        enumName: 'status',
        description: 'The status of the product',
        enum: product_enum_1.ProductStatus,
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'categoryId',
        required: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'restaurantId',
        required: true,
    }),
    (0, roles_decorator_1.Roles)('ADMIN', 'RESTAURANT'),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('categoryId')),
    __param(3, (0, common_1.Query)('restaurantId')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto, String, String, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'RESTAURANT'),
    (0, common_1.Post)('create-mutiple-products'),
    (0, swagger_1.ApiQuery)({
        name: 'restaurantId',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'categoryId',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        enumName: 'status',
        description: 'The status of the product',
        enum: product_enum_1.ProductStatus,
        required: true,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('restaurantId')),
    __param(2, (0, common_1.Query)('categoryId')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, create_products_dto_1.CreateProductsDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProducts", null);
__decorate([
    (0, common_1.Get)('gets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update'),
    (0, roles_decorator_1.Roles)('ADMIN', 'RESTAURANT'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, roles_decorator_1.Roles)('ADMIN', 'RESTAURANT'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('initProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "initData", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    (0, swagger_1.ApiTags)('Product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map