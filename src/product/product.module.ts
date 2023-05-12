import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { Category } from 'src/category/entities/category.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { JwtService } from '@nestjs/jwt';
import { ProductImage } from 'src/product-image/entities/product-image.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product,ProductImage]),
    CategoryModule,
    RestaurantsModule,
    UsersModule,
    RolesModule
  ],
  controllers: [ProductController],
  providers: [ProductService,CategoryService,RestaurantsService,UsersService,RolesService,JwtService],
  exports:[ProductModule,TypeOrmModule]
})
export class ProductModule {}
