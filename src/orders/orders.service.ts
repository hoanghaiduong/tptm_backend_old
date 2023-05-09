import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/User.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { UsersService } from 'src/users/users.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userService: UsersService,
    @InjectRepository(Product)
    private readonly productService: ProductService,
  ) { }

  // async createOrGetOrders(createOrderDto: CreateOrderDto): Promise<Order> {
  //   const user = await this.userService.findById(createOrderDto.auth.id);
  //   const existingCart = await this.orderRepository.findOne({
  //     where: { user: user.cart },
  //     relations: ['user', 'cartItems', 'cartItems.product']
  //   });

  //   if (existingCart) {
  //     return existingCart;
  //   }

  //   const newCart = new Cart();
  //   newCart.user = user;
  //   await this.cartRepository.save(newCart);
  //   return newCart;
  // }
  async create(createOrderDto: CreateOrderDto): Promise<Order|any> {
    const user=await this.userService.findById(createOrderDto.auth.id);
    if(!user)
    {
      throw new NotFoundException("User not found")
    }
   return user.cart
    // const order = await this.orderRepository.create({
    //   ...createOrderDto,
    //   user,
    // });
    // return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: string): Promise<Order> {

    const order = await this.orderRepository.findOne({
      where: { id }
    });
    if (!order) {
      throw new NotFoundException("ORDER NOT FOUND")
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    const merge = await this.orderRepository.merge(order, updateOrderDto);
    if (!merge) {
      throw new BadRequestException("Merge Failed");
    }
    const update = await this.orderRepository.update(id, merge);
    if (!update) {
      throw new BadRequestException("Update Failed");
    }
    return merge;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.orderRepository.delete(id);
  }
}
