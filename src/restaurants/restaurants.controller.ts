import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/jwt/Role.guard';
import { Roles } from 'src/roles/roles.decorator';
@ApiTags('Restaurants')
@Controller('restaurants')
// @UseGuards(RolesGuard)
// @Roles('RESTAURANT', 'ADMIN')
// @ApiBearerAuth()
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post('initRestaurants')
  async initData()
  {
    return await this.restaurantsService.initData();
  }

  @Post('create')
  async create(@Req() req, @Body() createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantsService.create({
      ...createRestaurantDto,
      auth: req.user
    });
  }
  @Get('getAll')
  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantsService.findAll();
  }

  @Get('getAllRestaurantAndProduct')
  async getAllRestaurantsAndProduct()
  {
    return await this.restaurantsService.getAllRestaurantsAndProduct();
  }
  @Get('get')
  async findOne(@Query('id') id: string): Promise<Restaurant> {
    return this.restaurantsService.findOneWithAllProduct(id);
  }

  @Patch('update')

 
  async update(@Req() req, @Query('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    return await this.restaurantsService.update(id, {
      ...updateRestaurantDto,
      auth: req.user
    });
  }
 
  @Delete('remove')
  async remove(@Query('id') id: string): Promise<Object> {
    return this.restaurantsService.remove(id);
  }

  @Get('getProductByRestaurant')
  async getProductByRestaurant(@Query('restaurantId') id: string){
    return await this.restaurantsService.findProductsByRestaurant(id);
  }
}
