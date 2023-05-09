import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/User.entity';
import { UsersService } from 'src/users/users.service';
import { ProductModule } from 'src/product/product.module';


@Module({
  imports:[TypeOrmModule.forFeature([Order]),
  UsersModule,
  ProductModule
],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports:[OrdersModule,TypeOrmModule]
})
export class OrdersModule {}
