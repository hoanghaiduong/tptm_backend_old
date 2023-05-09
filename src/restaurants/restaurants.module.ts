import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant]),
    UsersModule,
    RolesModule
  ],

  controllers: [RestaurantsController],
  providers: [RestaurantsService, UsersService, RolesService, JwtService],
  exports: [RestaurantsModule, TypeOrmModule]
})
export class RestaurantsModule { }
