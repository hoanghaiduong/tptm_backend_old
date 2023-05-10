import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
export declare class ReviewsService {
    private reviewsRepository;
    private productService;
    private userService;
    constructor(reviewsRepository: Repository<Review>, productService: ProductService, userService: UsersService);
    initData(): Promise<Review[]>;
    create(review: CreateReviewDto): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(id: string): Promise<Review>;
    remove(id: string): Promise<Review>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review>;
}
