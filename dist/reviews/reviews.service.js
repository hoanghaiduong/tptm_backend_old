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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const review_entity_1 = require("./entities/review.entity");
const typeorm_2 = require("typeorm");
let ReviewsService = class ReviewsService {
    constructor(reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }
    async create(review) {
        const createReview = await this.reviewsRepository.create(review);
        return await this.reviewsRepository.save(createReview);
    }
    async findAll() {
        return await this.reviewsRepository.find();
    }
    async findOne(id) {
        const review = await this.reviewsRepository.findOne({
            where: { id }
        });
        if (!review) {
            throw new common_1.NotFoundException("REVIEW NOT FOUNT");
        }
        return review;
    }
    async remove(id) {
        const review = await this.reviewsRepository.findOne({ where: { id } });
        if (!review) {
            throw new common_1.NotFoundException("REVIEW NOT FOUND");
        }
        return await this.reviewsRepository.remove(review);
    }
    async update(id, updateReviewDto) {
        const review = await this.reviewsRepository.findOne({ where: { id } });
        if (!review) {
            throw new common_1.NotFoundException("REVIEW NOT FOUND");
        }
        const updatedReview = await this.reviewsRepository.merge(review, updateReviewDto);
        await this.reviewsRepository.update(id, updatedReview);
        return updatedReview;
    }
};
ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map