import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/User.entity';
import { UsersService } from 'src/users/users.service';
import { ProductImage } from 'src/product-image/entities/product-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review,Product,Category,Restaurant,User,ProductImage])],
  controllers: [ReviewsController],
  providers: [ReviewsService,ProductService,CategoryService,RestaurantsService,UsersService],
  exports: [ReviewsModule, TypeOrmModule]
})
export class ReviewsModule { }
