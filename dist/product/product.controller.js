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
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path = require("path");
const roles_decorator_1 = require("../roles/roles.decorator");
const create_product_dto_1 = require("./dto/create-product.dto");
const create_products_dto_1 = require("./dto/create-products.dto");
const product_enum_1 = require("./enum/product.enum");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async create(req, createProductDto, files) {
        var _a;
        const photo = (_a = files === null || files === void 0 ? void 0 : files.photo) === null || _a === void 0 ? void 0 : _a[0];
        const images = files === null || files === void 0 ? void 0 : files.images;
        const filePath = `uploads/product/${photo.filename}`;
        const filesPath = images.map(file => `uploads/product/${file.filename}`);
        return this.productService.create(Object.assign(Object.assign({}, createProductDto), { auth: req.user, photo: filePath, images: filesPath }));
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
    remove(id) {
        return this.productService.remove(id);
    }
    async initData() {
        return await this.productService.intiProducts();
    }
};
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'RESTAURANT'),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                categoryId: {
                    type: 'string',
                    example: 'categoryId',
                },
                restaurantId: {
                    type: 'string',
                    example: 'restaurantId',
                },
                title: {
                    type: 'string',
                    example: 'Product title'
                },
                subtitle: {
                    type: 'string',
                    example: 'Product subtitle'
                },
                description: {
                    type: 'string',
                    example: 'DESCRIPTION PRODUCT'
                },
                price: {
                    type: 'double',
                    example: 14.67
                },
                quantity: {
                    type: 'integer',
                    example: 99
                },
                isPopular: {
                    type: 'boolean',
                    example: true
                },
                isFeatured: {
                    type: 'boolean',
                    example: true
                },
                status: {
                    type: 'string',
                    enum: Object.values(product_enum_1.ProductStatus),
                    example: product_enum_1.ProductStatus.AVAILABLE
                },
                photo: {
                    type: 'string',
                    format: 'binary',
                },
                images: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 5 },
        { name: 'photo', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: 'public/uploads/product',
            filename: (req, file, callback) => {
                let name = `${Date.now()}-unknown`;
                if (file.originalname && typeof file.originalname === 'string') {
                    name = `${Date.now()}-${path.parse(file.originalname).name}`;
                }
                const extension = path.parse(file.originalname || '').ext;
                const fileName = `${name}${extension}`;
                console.log("Uploading...");
                callback(null, fileName);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
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