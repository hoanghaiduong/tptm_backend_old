import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from './config/ConfigModule';
import { ProductModule } from './product/product.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

import { CartItemModule } from './cart-item/cart-item.module';
import { CartModule } from './cart/cart.module';
import { FilesModule } from './files/files.module';
import { MapsModule } from './maps/maps.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrdersModule } from './orders/orders.module';
import { ProductImageModule } from './product-image/product-image.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ReviewsModule } from './reviews/reviews.module';


@Module({
  imports: [
    ConfigModule, AuthModule, UsersModule, RolesModule, ProductModule, CategoryModule, OrdersModule, FilesModule, RestaurantsModule, ReviewsModule, MapsModule, OrderItemModule, CartModule, CartItemModule, ProductImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
