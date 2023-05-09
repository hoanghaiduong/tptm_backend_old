import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]),
    RolesModule,UsersModule,ProductModule,CategoryModule,RestaurantsModule],
  controllers: [CartController],
  providers: [CartService, RolesService,JwtService,UsersService,ProductService,CategoryService,RestaurantsService],
  exports: [CartModule, TypeOrmModule]
})
export class CartModule { }
