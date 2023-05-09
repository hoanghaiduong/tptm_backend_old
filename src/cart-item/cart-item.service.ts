import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/User.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly userService: UsersService
  ) {

  }


  async createOrUpdate(createCartItemDto: CreateCartItemDto): Promise<CartItem|any> {
 
      const user = await this.userService.findById(createCartItemDto.auth.id);
      if(!user)
      {
        throw new NotFoundException("User not found");
      }
      
      const [cart, product] = await Promise.all([
        this.cartService.getCartByUser(user),
        this.productService.findOne(createCartItemDto.productId)
      ])
      if(!cart)
      {
        throw new NotFoundException("CART NOT FOUND IN user");
      }
      if(!product)
      {
        throw new NotFoundException("PRODUCT NOT FOUND")
      }
      let cartItem=(await this.findAll()).find((item) => item.product.id === product.id)
   
     
      if (createCartItemDto.quantity < 0) {
        // Remove cart item from cart
        if (cartItem) {
          await this.cartItemRepository.remove(cartItem);
          cart.cartItems = cart.cartItems.filter((item) => item.id !== cartItem.id);
          await this.cartItemRepository.save(cart);
        }
        throw new BadRequestException('Invalid cart item quantity');
      }

      if (cartItem) {
        
        // Update existing cart item
        cartItem.quantity = createCartItemDto.quantity;
        cartItem = await this.cartItemRepository.save(cartItem);
      } else {
        // Create new cart item

        console.log("create cart item new cart item");
        cartItem = await this.cartItemRepository.create({
          ...createCartItemDto,
          product,
          cart
        });
        cart.cartItems.push(cartItem);
        await this.cartItemRepository.save(cartItem);
      }

      return cartItem;
   
  }

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const user = await this.userService.findById(createCartItemDto.auth.id);
    const cartItem = await this.cartService.getCartByUser(user);
    const product = await this.productService.findOne(createCartItemDto.productId);

    const created = await this.cartItemRepository.create({
      ...createCartItemDto,
      product: product,
      cart: cartItem,
    });
    if (!created) {
      throw new BadRequestException("CREATE cart item failed")
    }
    return await this.cartItemRepository.save(created);
  }

  async findAll(): Promise<CartItem[]> {
    return await this.cartItemRepository.find({
      relations:['product']
    });
  }

  async findOne(id: string): Promise<CartItem> {
    const cartItem = this.cartItemRepository.findOne({
      where: { id },
      relations: ['product']
    })
    if (!cartItem) {
      throw new NotFoundException("Cart item not found");
    }
    return cartItem;
  }

  async update(id: string, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.findOne(id);
    const merged = await this.cartItemRepository.merge(cartItem, updateCartItemDto);
    if (updateCartItemDto.quantity) {
      merged.quantity = updateCartItemDto.quantity;
    }
    const updatedCartItem = await this.cartItemRepository.save(merged);
    if (!updatedCartItem) {
      throw new BadRequestException("Update cart item failed");
    }
    return updatedCartItem;
  }

  async remove(id: string): Promise<void> {
    await this.cartItemRepository.delete(id);
  }
}
