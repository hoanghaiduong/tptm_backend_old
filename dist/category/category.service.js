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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto) {
        try {
            const category = this.categoryRepository.create(createCategoryDto);
            return await this.categoryRepository.save(category);
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError) {
                throw new common_1.BadRequestException({
                    message: error.message
                });
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async findAll(options) {
        const { page, limit, relations } = options !== null && options !== void 0 ? options : {};
        if (page !== undefined && limit !== undefined) {
            const [categories, total] = await this.categoryRepository.findAndCount({
                relations: relations,
                skip: (page - 1) * limit,
                take: limit,
            });
            return { categories, total, page, limit };
        }
        else {
            const categories = await this.categoryRepository.find({ relations: relations });
            return { categories, total: categories.length };
        }
    }
    async findOne(id) {
        return this.categoryRepository.findOne({ where: { id }, relations: ['products'] });
    }
    async update(id, updateCategoryDto) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const updated = await this.categoryRepository.merge(category, updateCategoryDto);
        if (!updated) {
            throw new common_1.BadRequestException('ERROR updating category');
        }
        return this.categoryRepository.save(category);
    }
    async remove(id) {
        await this.categoryRepository.delete(id);
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map