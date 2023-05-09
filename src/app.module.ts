import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from './config/ConfigModule';
import { ProductModule } from './product/product.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

import { FilesModule } from './files/files.module';
import { MapsModule } from './maps/maps.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';


@Module({
  imports: [
    ConfigModule, AuthModule, UsersModule, RolesModule, ProductModule, CategoryModule, OrdersModule, FilesModule, RestaurantsModule, ReviewsModule, MapsModule, OrderItemModule, CartModule, CartItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
