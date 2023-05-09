import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CartService } from 'src/cart/cart.service';
import { UsersService } from 'src/users/users.service';
import { ProductService } from 'src/product/product.service';
import { CategoryService } from 'src/category/category.service';
import { CartModule } from 'src/cart/cart.module';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/product/product.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { CategoryModule } from 'src/category/category.module';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]),
    CartModule,
    UsersModule,
    ProductModule,
    RestaurantsModule,
    CategoryModule,
    RolesModule
  ],
  controllers: [CartItemController],
  providers: [CartItemService, CartService, UsersService, ProductService, CategoryService, RestaurantsService, RolesService,JwtService],
  exports: [CartItemModule, TypeOrmModule]
})
export class CartItemModule { }
