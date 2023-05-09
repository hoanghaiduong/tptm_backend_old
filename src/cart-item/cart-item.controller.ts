import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/jwt/Role.guard';
import { Roles } from 'src/roles/roles.decorator';

@UseGuards(RolesGuard)
@ApiBearerAuth()
@Roles('USER', 'FARM')
@Controller('cart-item')
@ApiTags("CART ITEM")
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) { }
  @Post('createOrUpdate')
  @ApiQuery({
    name: 'productId',
    required: true
  })
 async createOrUpdate(@Req() req, @Body() createCartItemDto: CreateCartItemDto, @Query('productId') productId: string) {
    return await this.cartItemService.createOrUpdate({
      ...createCartItemDto,
      productId,
      auth: req.user,
    });
  }
  // @Post('create-item-cart')
  // create(@Req() req,@Body() createCartItemDto: CreateCartItemDto,@Query('productId') productId:string) {
  //   return this.cartItemService.create({
  //     ...createCartItemDto,
  //     productId:productId,
  //     auth:req.user.id
  //   });
  // }

  @Get('get-items-cart')
  findAll() {
    return this.cartItemService.findAll();
  }

  @Get('get-item-cart')
  findOne(@Query('id') id: string) {
    return this.cartItemService.findOne(id);
  }

  @Patch('update-item-cart')
  update(@Query('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemService.update(id, updateCartItemDto);
  }

  @Delete('delete-item-cart')
  async remove(@Query('id') id: string): Promise<Object> {
    await this.cartItemService.remove(id);
    return {
      status: 'success',
      message: 'Cart item deleted successfully '
    }
  }
}
