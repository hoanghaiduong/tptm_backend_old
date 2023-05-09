import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/User.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private productService: ProductService,
    private userService: UsersService
  ) {

  }
  async createOrGetCart(createCartDto: CreateCartDto): Promise<Cart> {
    const user = await this.userService.findById(createCartDto.auth.id);
    const existingCart = await this.cartRepository.findOne({
      where: { user: user.cart },
      relations: ['user', 'cartItems', 'cartItems.product']
    });

    if (existingCart) {
      return existingCart;
    }

    const newCart = new Cart();
    newCart.user = user;
    await this.cartRepository.save(newCart);
    return newCart;
  }

  async createOrGetCart2(createCartDto: CreateCartDto): Promise<Cart> {
    const user = await this.userService.findById(createCartDto.auth.id);
    const cart = await this.cartRepository.createQueryBuilder('cart')
      .leftJoinAndSelect('cart.user', 'user')
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .leftJoinAndSelect('cartItem.product', 'product')
      .where('user.id = :userId', { userId: user.id })
      .getOne();

    if (cart) {
      // Giỏ hàng đã tồn tại, trả về giỏ hàng đó
      return cart;
    }

    // Nếu không có giỏ hàng, tạo mới giỏ hàng
    const newCart = new Cart();
    newCart.user = user;
    await this.cartRepository.save(newCart);
    return newCart;
  }



  // async create(createCartDto: CreateCartDto) {

  //   // const [findProductByIds, user] = await Promise.all([
  //   //   this.productService.findByIds(createCartDto.products),
  //   //   this.userService.findById(createCartDto.auth.id),
  //   // ]);

  //   // const creating = await this.cartRepository.create({
  //   //   ...createCartDto,
  //   //   products: findProductByIds.products,
  //   //   user: user,
  //   //   quantity: findProductByIds.count,
  //   // });

  //   // return await this.cartRepository.save(creating);
  // }


  async findAll(): Promise<{ cart: Cart[], count: number }> {
    const all = await this.cartRepository.find({
      relations: ['user', 'cartItems']
    });
    return { cart: all, count: all.length }
  }

  async findOne(id: string): Promise<Cart> {
    const user = await this.userService.findById(id);

    const cart = await this.cartRepository.findOne({
      where: { user: user.cart },
      relations: ['user', 'cartItems']
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }
  async getCartByUser(user: User): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user: user.cart },
      relations: ['user', 'cartItems']
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async update(updateCartDto: UpdateCartDto) {
    //   const [findProductByIds, user] = await Promise.all([
    //     this.productService.findByIds(updateCartDto.products),
    //     this.userService.findById(updateCartDto.auth.id),
    //   ]);
    //  console.log(findProductByIds,user)
    //   const cart = await this.findOne(user.cart.id);
    //   if (cart.user.id !== user.id) {
    //     throw new UnauthorizedException('You are not authorized to update this cart');
    //   }
    //   const merge = await this.cartRepository.merge(cart, {
    //     products: findProductByIds.products,
    //     quantity: findProductByIds.count
    //   });
    //   // cart.products = findProductByIds.products;
    //   // cart.quantity = findProductByIds.count;
    //   const updated = await this.cartRepository.update(cart.id, cart);
    //   if (!updated) {
    //     throw new NotFoundException("Cart update failed")
    //   }
    //   return merge;
  }
  // async addProductToCart(user: User, product: Product, quantity: number) {
  //   const cart = await this.cartService.findOne(user.id);
    
  //   let cartItem = await this.cartItemRepository.findOne({
  //     where: { product, cart },
  //   });
  
  //   if (!cartItem) {
  //     cartItem = await this.cartItemRepository.create({
  //       product,
  //       cart,
  //       quantity,
  //     });
  //   } else {
  //     cartItem.quantity += quantity;
  //   }
  
  //   await this.cartItemRepository.save(cartItem);
  // }
  remove(id: string) {
    return `This action removes a #${id} cart`;
  }
}
