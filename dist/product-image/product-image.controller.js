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
exports.ProductImageController = void 0;
const common_1 = require("@nestjs/common");
const product_image_service_1 = require("./product-image.service");
const create_product_image_dto_1 = require("./dto/create-product-image.dto");
const update_product_image_dto_1 = require("./dto/update-product-image.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
const fs = require("fs");
const Role_guard_1 = require("../auth/jwt/Role.guard");
const auth_guard_1 = require("../auth/jwt/auth.guard");
let ProductImageController = class ProductImageController {
    constructor(productImageService) {
        this.productImageService = productImageService;
    }
    async uploadMultipleFiles(files) {
        try {
            const filesPath = files.map(file => `src/product/images/${file.filename}`);
            return { message: 'Files uploaded successfully', files: filesPath };
        }
        catch (error) {
            throw new common_1.BadRequestException("Error uploading files" + error.message);
        }
    }
    create(createProductImageDto) {
        return this.productImageService.create(createProductImageDto);
    }
    findAll() {
        return this.productImageService.findAll();
    }
    findOne(id) {
        return this.productImageService.findOne(+id);
    }
    update(id, updateProductImageDto) {
        return this.productImageService.update(+id, updateProductImageDto);
    }
    remove(id) {
        return this.productImageService.remove(+id);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('upload-multiple-images-product'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 5, {
        fileFilter(req, file, callback) {
            const allowedTypes = [
                'image/jpeg', 'image/png'
            ];
            const isValid = allowedTypes.includes(file.mimetype);
            callback(null, isValid);
        },
        storage: (0, multer_1.diskStorage)({
            destination: `src/product/images`,
            filename: async (req, file, callback) => {
                const uid = req['uid'];
                const { productId } = req.query;
                if (uid && productId) {
                    let name = `${uid}_${productId}-unknown`;
                    if (file.originalname && typeof file.originalname === 'string') {
                        name = `${uid}_${productId}-${path.parse(file.originalname).name}`;
                    }
                    const extension = path.parse(file.originalname || '').ext;
                    const filePath = path.join(`src/files/uploads`, `${name}${extension}`);
                    if (fs.existsSync(filePath)) {
                        console.log("file already exists! deleting...");
                        fs.unlinkSync(filePath);
                        console.log("Deleted!");
                    }
                    console.log("Uploading...");
                    callback(null, `${name}${extension}`);
                }
                else {
                    callback(new common_1.BadRequestException("Invalid user or product"), null);
                }
            },
        })
    })),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Files uploaded successfully' }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "uploadMultipleFiles", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_image_dto_1.CreateProductImageDto]),
    __metadata("design:returntype", void 0)
], ProductImageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductImageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductImageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_image_dto_1.UpdateProductImageDto]),
    __metadata("design:returntype", void 0)
], ProductImageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductImageController.prototype, "remove", null);
ProductImageController = __decorate([
    (0, common_1.Controller)('product-image'),
    __metadata("design:paramtypes", [product_image_service_1.ProductImageService])
], ProductImageController);
exports.ProductImageController = ProductImageController;
//# sourceMappingURL=product-image.controller.js.map