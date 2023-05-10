import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    private productService: ProductService,
    private userService: UsersService
  ) { }
  async initData() {
    const product = await this.productService.findOne("58a0d467-dbf2-46b6-890f-2c5507150876");
    if (!product) throw new NotFoundException("Product not found");
    const user = await this.userService.findById("26e4b8c3-81f5-4116-af86-bf66ffa1ac01");
    if (!user) throw new NotFoundException("USER NOT FOUND")
    const creating = await this.reviewsRepository.create([
      {
        rating: 5,
        comment: "Mực khổng lồ một món tên gọi đúng chất thực sự, nó rất nhiều ăn không hết phải xin bọc mang về!",
        photo: 'https://image.cooky.vn/recipe/g5/49618/s/76e3307c-cd68-4dc8-a1f2-7dd95f789ac3.jpeg',
        product,
        user
      }
    ])
    return await this.reviewsRepository.save(creating);
  }
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
