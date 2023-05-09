import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) { }
  async create(review: CreateReviewDto): Promise<Review> {
    const createReview = await this.reviewsRepository.create(review);
    return await this.reviewsRepository.save(createReview);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewsRepository.find();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id }
    });
    if (!review) {
      throw new NotFoundException("REVIEW NOT FOUNT");
    }
    return review;
  }
  async remove(id: string): Promise<Review> {
    const review = await this.reviewsRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException("REVIEW NOT FOUND");
    }
    return await this.reviewsRepository.remove(review);
  }
  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewsRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException("REVIEW NOT FOUND");
    }
    const updatedReview = await this.reviewsRepository.merge(review, updateReviewDto);
    await this.reviewsRepository.update(id, updatedReview);
    return updatedReview;
  }




}
