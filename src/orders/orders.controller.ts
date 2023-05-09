import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Tạo đơn hàng mới' })
  @ApiResponse({ status: 201, description: 'Đơn hàng đã được tạo thành công' })
  @Post('create')
  async createOrder(@Req() req,@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create({
      ...createOrderDto,
      auth:req.user
    });
  }

  @Get(
    'gets'
  )
 async findAll() :Promise<Order[]>{
    return await this.ordersService.findAll();
  }

  @Get('get')
  findOne(@Query('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch('update')
 async update(@Query('id') id: string, @Body() updateOrderDto: UpdateOrderDto):Promise<Order> {
    return await this.ordersService.update(id, updateOrderDto);
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    return this.ordersService.remove(id);
  }
}
