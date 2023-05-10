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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const multer_1 = require("multer");
const path = require("path");
const files_service_1 = require("./files.service");
const util_1 = require("util");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async uploadFile(file) {
        console.log(file);
        const filePath = `src/files/upload/${file.filename}`;
        return { message: 'File uploaded successfully', file: filePath };
    }
    async uploadMultipleFiles(files) {
        console.log(files);
        const filesPath = files.map(file => `src/files/uploads/${file.filename}`);
        return { message: 'Files uploaded successfully', files: filesPath };
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'src/files/upload',
            filename: (req, file, callback) => {
                const extension = path.extname(file.originalname);
                const filename = `${file.originalname}`;
                callback(null, filename);
            },
        }),
    })),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File uploaded successfully' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload-multiple'),
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: 'src/files/uploads',
            filename: async (req, file, callback) => {
                let name = `${Date.now()}-unknown`;
                if (file.originalname && typeof file.originalname === 'string') {
                    name = `${Date.now()}-${path.parse(file.originalname).name}`;
                }
                const extension = path.parse(file.originalname || '').ext;
                const filePath = path.join('src/files/uploads', `${name}${extension}`);
                const fileExists = await (0, util_1.promisify)(fs.access)(filePath, fs.constants.F_OK)
                    .then(() => true)
                    .catch(() => false);
                if (!fileExists) {
                    callback(null, `${name}${extension}`);
                }
                else {
                    throw new Error('File already exists');
                }
            },
        })
    })),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Files uploaded successfully' }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadMultipleFiles", null);
FilesController = __decorate([
    (0, common_1.Controller)('files'),
    (0, swagger_1.ApiTags)('FILE'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map