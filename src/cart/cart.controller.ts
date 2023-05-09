import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/jwt/Role.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('cart')
@ApiTags("CART")
@UseGuards(RolesGuard)
@ApiBearerAuth()

export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('create-or-get-cart')
  @Roles('FARM', 'USER')
  async createORgetCart(@Req() req,createCartDto: CreateCartDto) {
    return await this.cartService.createOrGetCart({
      ...createCartDto,
      auth:req.user,
    });
  }

//  @Roles('ADMIN')
  @Get(
  'carts'
  )
  findAll() {
    return this.cartService.findAll();
  }

  // @Get('get')
  // @Roles('USER','FARM')
  // async findOne(@Req() req) {
  //   return this.cartService.findOne(req.user.id);
  // }

  // @Patch('update-cart')
 
  // @Roles('FARM', 'USER')
  // async update(@Req() req, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update({
  //     ...updateCartDto,
  //     auth:req.user.id,
  //   });
  // }

  // @Delete('delete-cart')
  // remove(@Query('id') id: string) {
  //   return this.cartService.remove(id);
  // }
}
