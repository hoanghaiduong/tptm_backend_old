import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Not, QueryFailedError, Repository, getManager } from 'typeorm';
import * as fs from 'fs';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductStatus } from './enum/product.enum';
import { CategoryService } from 'src/category/category.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { UsersService } from 'src/users/users.service';
import multer, { diskStorage } from 'multer';
import * as path from 'path';
import { ProductImage } from 'src/product-image/entities/product-image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private CategoriesService: CategoryService,
    private restaurantService: RestaurantsService,
    private userService: UsersService,
    private dataSource: DataSource,
    @InjectRepository(ProductImage)
    private _productImageRepository: Repository<ProductImage>
  ) { }

  async intiProducts() {

    // const category = await this.CategoriesService.findOne('348cabbc-f112-45fe-8cbc-fc88eaa269b6');
    const restaurant = await this.restaurantService.findOne('b08d0a36-d8db-428f-a78a-a3676704c802');
    // if (!category) {
    //   throw new BadRequestException('Cannot find category');
    // }
    if (!restaurant) {
      throw new BadRequestException('Cannot find restaurant');
    }
    // const creating = await this.productRepository.create([
    //   // {
    //   //   title: 'SET LẨU NEO',
    //   //   subtitle: 'Neo Set',
    //   //   description: 'Tổng hợp 7 món trong một set , kèm với set rau sức khoẻ . Thích hợp cho  3 - 4 người',
    //   //   price: 410000,
    //   //   category,
    //   //   restaurant,
    //   // },
    //   // {
    //   //   title: 'Set lẩu tiết kiệm',
    //   //   subtitle: 'Great Value Set',
    //   //   description: 'Ngon hấp dẫn với các loại nước chấm',
    //   //   price: 220000,
    //   //   category,
    //   //   restaurant,
    //   // },
    //   // {
    //   //   title: 'Rau sức khoẻ',
    //   //   subtitle: 'Healthy Set',
    //   //   description: 'Ngon hấp dẫn với các loại nước chấm',
    //   //   price: 190000,
    //   //   category,
    //   //   restaurant,
    //   // },
    //   // {
    //   //   title: 'Lẩu Shabu',
    //   //   subtitle: 'Shabu Set',
    //   //   description: 'Ngon hấp dẫn với các loại nước chấm',
    //   //   price: 280000,
    //   //   category,
    //   //   restaurant,
    //   // },
    //   // {
    //   //   title: 'Set lẩu KwangTung',
    //   //   subtitle: 'KwangTung Set',
    //   //   description: 'Ngon hấp dẫn với các loại nước chấm',
    //   //   price: 245000,
    //   //   category,
    //   //   restaurant,
    //   // },
    //   // {
    //   //   title: 'Set lẩu Hải Lẳm',
    //   //   subtitle: 'Hainan Set',
    //   //   description: 'Ngon hấp dẫn với các loại nước chấm',
    //   //   price: 265000,
    //   //   category,
    //   //   restaurant,
    //   // },
    //   // {
    //   //   title: 'Set lẩu Tae-Jew',
    //   //   subtitle: 'Teochew Set',
    //   //   description: 'Ngon hấp dẫn với các loại nước chấm',
    //   //   price: 265000,
    //   //   category,
    //   //   restaurant,
    //   // },
    //   // {
    //   //   title: 'Set lẩu Tom-Yum',
    //   //   subtitle: 'Tom Yum Set',
    //   //   description: 'Ngon nhân đôi khi dùng với sốt Tom-Yum',
    //   //   price: 265000,
    //   //   category,
    //   //   restaurant,
    //   // },
    //   // {
    //   //   title: 'Set lẩu Taiwanese',
    //   //   subtitle: 'Taiwanese Set',
    //   //   description: 'Ngon nhân đôi khi dùng với sốt Tom-Yum',
    //   //   price: 265000,
    //   //   category,
    //   //   restaurant,
    //   // },
    // ]);
    // const chusuki=await this.productRepository.create([
    //    {
    //     title: 'Combo 4 có sẵn nước lẩu (2-3 ng)',
    //     subtitle: 'COMBO LẨU',
    //     description: 'Tự chọn vị lẩu: Chua cay - Tứ xuyên - Súp gà - Kim chi',
    //     price: 259000,
    //     type:'COMBO',
    //     restaurant,
    //   },
    //   {
    //     title: 'Combo Wow có sẵn nước lẩu (4 ng)',
    //     subtitle: 'COMBO LẨU',
    //     description: 'Chọn vị lẩu: Chua cay - Súp gà - Kim chi - Tứ xuyên',
    //     price: 399000,
    //     type:'COMBO',
    //     restaurant,
    //   },
    //   {
    //     title: 'Combo 2 - có sẵn nước lẩu (2-3 Người)',
    //     subtitle: 'COMBO LẨU',
    //     description: 'Khách tự chọn vị lẩu: Chua cay - Súp gà - Tứ xuyên - Kim chi',
    //     price: 239000,
    //     type:'COMBO',
    //     restaurant,
    //   },
    //   {
    //     title: 'Combo Family có sẵn nước lẩu (5-6 ng)',
    //     subtitle: 'COMBO LẨU',
    //     description: 'Chọn vị lẩu: Chua cay - Súp gà - Kim chi - Tứ xuyên',
    //     price: 599000,
    //     type:'COMBO',
    //     restaurant,
    //   },
    //   {
    //     title: 'Set hoàng kim',
    //     subtitle: 'SET',
    //     description: 'VIÊN THẢ LẨU',
    //     price: 119000,
    //     type:'TOPING',
    //     restaurant,
    //   },
    //   {
    //     title: 'Bánh bao nhím biển',
    //     subtitle: 'Bánh bao',
    //     description: 'VIÊN THẢ LẨU',
    //     price: 42000,
    //     type:'TOPING',
    //     restaurant,
    //   },
    //   {
    //     title: 'Đậu hũ phô mai',
    //     subtitle: 'Bánh bao',
    //     description: 'VIÊN THẢ LẨU',
    //     price: 39000,
    //     type:'TOPING',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cơm chiên hải sản',
    //     subtitle: 'Cơm chiên',
    //     description: 'MÓN ĂN KÈM',
    //     price: 59000,
    //     type:'TOPING',
    //     restaurant,
    //   },
    //   {
    //     title: 'Miến xào hải sản',
    //     subtitle: 'Đồ xào',
    //     description: 'MÓN ĂN KÈM',
    //     price: 69000,
    //     type:'TOPING',
    //     restaurant,
    //   },
    // ])
    // const Kaiserin=await this.productRepository.create([
    //   {
    //     title: 'Cá mú nghệ nhúng mẻ',
    //     subtitle: 'Hải Sản',
    //     description: 'Sống ở các rặng san hô ngoài đại dương, là loài cá dữ, khỏe chuyên ăn mồi sống. Mỗi con với trọng lượng từ 6 – 20kg.',
    //     price: 310.000,
    //     dvt:'0.5/KG',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cua lột sốt me',
    //     subtitle: 'Hải Sản',
    //     description: '',
    //     price: 78000,
    //     dvt:'1/CON',
    //     restaurant,
    //   },
    //   {
    //     title: 'Lẩu cua đồng',
    //     subtitle: 'Hải Sản',
    //     description: '',
    //     price: 219000,
    //     dvt:'1/Lẩu',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cơm chiên ngũ sắc',
    //     subtitle: 'Cơm',
    //     description: '',
    //     price: 85000,
    //     dvt:'1/DĨA',
    //     restaurant,
    //   },
    //   {
    //     title: 'Xôi bồ câu',
    //     subtitle: 'Xôi',
    //     description: '',
    //     price: 150000,
    //     dvt:'1/SET',
    //     restaurant,
    //   },
    //   {
    //     title: 'Lẩu gà ác trứng tiềm ớt hiểm',
    //     subtitle: 'Lẩu',
    //     description: '',
    //     price: 220000,
    //     dvt:'1/LẨU',
    //     restaurant,
    //   },
    //   {
    //     title: 'Gỏi bò',
    //     subtitle: 'Gỏi',
    //     description: '',
    //     price: 90000,
    //     dvt:'1/Dĩa',
    //     restaurant,
    //   },
    //   {
    //     title: 'Gà ta hấp bí đỏ',
    //     subtitle: 'Gỏi',
    //     description: '',
    //     price: 242500,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cá rô kho riềng ủ trấu',
    //     subtitle: 'Hải sản',
    //     description: '',
    //     price: 105000,
    //     dvt:'1/Con',
    //     restaurant,
    //   },
    //   {
    //     title: 'Tôm sú rang muối cay',
    //     subtitle: 'Hải sản',
    //     description: '',
    //     price: 145000,
    //     dvt:'1/Dĩa',
    //     restaurant,
    //   },
    // ]);
    // const lautom5ri = await this.productRepository.create([
    //   {
    //     title: 'Bún Chạo Tôm',
    //     subtitle: 'Bún',
    //     description: '',
    //     price: 44000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Chạo Tôm',
    //     subtitle: 'Chả',
    //     description: '',
    //     price: 34000,
    //     dvt:'1/Cây',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cua Hấp',
    //     subtitle: 'Hải sản',
    //     description: '',
    //     price: 232000,
    //     dvt:'1/Con',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cua Rang Me',
    //     subtitle: 'Hải Sản',
    //     description: '',
    //     price: 232000,
    //     dvt:'1/Con',
    //     restaurant,
    //   },
    //   {
    //     title: 'Nghêu Hấp',
    //     subtitle: 'Hải Sản',
    //     description: '',
    //     price: 64000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Ốc Len Xào Dừa',
    //     subtitle: 'Hải Sản',
    //     description: '',
    //     price: 64000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Tôm Rang Me',
    //     subtitle: 'Hải Sản',
    //     description: '',
    //     price: 138000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Xôi Cuộn Gà',
    //     subtitle: 'Xôi',
    //     description: '',
    //     price: 96000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Lẩu Tôm',
    //     subtitle: 'Lẩu',
    //     description: '',
    //     price: 211000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Lẩu Hải Sản',
    //     subtitle: 'Lẩu',
    //     description: '',
    //     price: 211000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Lẩu Cá Thác Lác',
    //     subtitle: 'Lẩu',
    //     description: '',
    //     price: 211000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    // ])
    //  const thietmoclan = await this.productRepository.create([
    //   {
    //     title: 'Cơm chiên bò',
    //     subtitle: 'Cơm',
    //     description: '',
    //     price: 140000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cải mầm sốt thịt bò',
    //     subtitle: '',
    //     description: '',
    //     price: 160000,
    //     dvt:'1/Cây',
    //     restaurant,
    //   },
    //   {
    //     title: 'Bún thịt ba rọi nướng',
    //     subtitle: 'Bún',
    //     description: '',
    //     price: 195000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cá trứng chiên giòn',
    //     type:'KHAI VỊ',
    //     subtitle: 'Hải Sản',
    //     description: '',
    //     price: 110000,
    //     dvt:'1/Con',
    //     restaurant,
    //   },
    //   {
    //     title: 'Khoai môn chiên giòn',
    //     type:'KHAI VỊ',
    //     subtitle: '',
    //     description: '',
    //     price: 65000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Lẩu cá chình bông măng chua',
    //     subtitle: 'Lẩu',
    //     description: '',
    //     price: 1710000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Ốc hương hấp xả - phần 2 người',
    //     subtitle: 'Ốc',
    //     description: '',
    //     price: 270000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Lẩu gà nấu nấm',
    //     subtitle: 'Lẩu',
    //     description: '',
    //     price: 440000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Gỏi nấm thiết mộc lan',
    //     subtitle: 'Gỏi',
    //     description: '',
    //     price: 150000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Lẩu thái hải sản',
    //     subtitle: 'Lẩu',
    //     description: '',
    //     price: 330000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Chả Giò Thiết Mộc Lan - 8 Cuốn',
    //     subtitle: '',
    //     description: '',
    //     price: 150000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    // ])
    // const leebbq = await this.productRepository.create([
    //   {
    //     title: 'Cơm cuộn phủ trứng tôm',
    //     subtitle: 'Cơm',
    //     description: '',
    //     price: 85800,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Mực tẩm bột chiên với sốt vị tắc',
    //     subtitle: '',
    //     description: '',
    //     price: 107800,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Salad rau mầm trứng tôm',
    //     subtitle: 'Món Khai Vị',
    //     description: '',
    //     price: 99000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Miến xào xứ Hàn với nấm',
    //     type:'KHAI VỊ',
    //     subtitle: '',
    //     description: '',
    //     price: 85000,
    //     dvt:'1/Con',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cơm trộn thố đá với thịt bằm',
    //     type:'Cơm',
    //     subtitle: '',
    //     description: '',
    //     price: 96000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Canh kim chi thịt bò',
    //     subtitle: '',
    //     description: '',
    //     price: 96800,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Lẩu kim chi thập cẩm cỡ lớn',
    //     subtitle: 'Lẩu',
    //     description: '',
    //     price: 484000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Ba chỉ bò Mỹ thái mỏng',
    //     subtitle: 'Đồ ăn thêm lẩu',
    //     description: '',
    //     price: 99000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Đùi gà phi lê',
    //     subtitle: 'Đồ ăn thêm lẩu',
    //     description: '',
    //     price: 85800,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Mực khổng lồ tươi',
    //     subtitle: 'Đồ ăn thêm lẩu',
    //     description: '',
    //     price: 107800,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Salad rau xanh sốt cay Hàn Quốc',
    //     subtitle: 'SALAD KHAI VỊ',
    //     description: 'SALAD KHAI VỊ',
    //     price: 63800,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    // ])
    // const gogihouse = await this.productRepository.create([
    //   {
    //     title: 'Cơm trộn bạch tuột',
    //     subtitle: 'Cơm',
    //     description: '',
    //     price: 106920,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cơm trộn bát đá Hàn Quốc sốt Gogi',
    //     subtitle: 'Cơm',
    //     description: '',
    //     price: 106920,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Canh Kim Chi',
    //     subtitle: '',
    //     description: 'Món Truyền Thống Hàn Quốc (Chế biến 15 phút)',
    //     price: 96000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Súp tương đậu Hàn Quốc',
    //     type:'KHAI VỊ',
    //     subtitle: '',
    //     description: '',
    //     price: 106000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Canh thịt bò bulgogi',
    //     type:'',
    //     subtitle: '',
    //     description: '',
    //     price: 106920,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Combo thịt nướng tiết kiệm',
    //     subtitle: '',
    //     description: '(Sườn heo Mỹ sốt Galbi, ba chỉ heo Mỹ tươi, ức bò Mỹ, dẻ sườn hoàng đế tươi) 600g, dẻ sườn bò Mỹ sốt mật ong 150g, salad hoa quả tươi, kimbap chiên, rau cuốn, kim chi cải thảo, panchan rong biển hành hẹ',
    //     price: 685000,
    //     dvt:'1/SET',
    //     restaurant,
    //   },
    //   {
    //     title: 'Combo thịt nướng siêu tiết kiệm',
    //     subtitle: '',
    //     description: '(Sườn non bò Mỹ hảo hạng, ức bò Mỹ, dẻ sườn Hoàng Đế tươi, ba chỉ heo Mỹ tươi) 600g; dẻ sườn hoàng đế tươi 150g, sườn non bò Mỹ la sốt Obathan 150g, tokpokki hải sản, salad củ sen, rau cuốn, kim chi cải thảo, panchan rong biển, panchan hành hẹ',
    //     price: 880200,
    //     dvt:'1/SET',
    //     restaurant,
    //   },
    //   {
    //     title: 'Combo nướng lẩu hấp dẫn',
    //     subtitle: '',
    //     description: 'Ba chỉ bò Mỹ 250g, diềm cơ 200g, dẻ sườn 200g, xúc xích nấm, nấm tiên (nấm đùi gà), kim chi cải thảo, bắp Mỹ, khoai, lá nhíp, miến Hàn Quốc/ Mì gói Hàn Quốc, lẩu quân đội',
    //     price: 772200,
    //     dvt:'1/SET',
    //     restaurant,
    //   },
    //   {
    //     title: 'Set Cơm Ba Chỉ Bò Mỹ',
    //     subtitle: '',
    //     description: 'Thịt đã nướng chín. Ba chỉ bò Mỹ sốt mật ong 100g, salad cá ngừ Deli 73g, chén canh rong biển 120ml, kim chi cải thảo 50g, panchan rong biển 50g, cơm trắng 180g.',
    //     price: 106920,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Set Cơm Trộn Hàn Quốc',
    //     subtitle: '',
    //     description: 'Cơm trộn Hàn Quốc 400g, chén canh rong biển 120ml, kim chi cải thảo 50g, panchan rong biển 50g.',
    //     price: 107800,
    //     dvt:'1/SET',
    //     restaurant,
    //   },
    //   {
    //     title: 'Set Cơm Gầu Bò Sốt Mật Ong',
    //     subtitle: '',
    //     description: 'Thịt đã nướng chín. Gầu bò Mỹ sốt mật ong 100g, salad tổng hợp Deli 85g, chén canh rong biển 120ml, kim chi cải thảo 50g, Panchan rong biển 50g, cơm trắng 180g.',
    //     price: 106920,
    //     dvt:'1/SET',
    //     restaurant,
    //   },
    // ])
    // const nhavienquan = await this.productRepository.create([
    //   {
    //     title: 'Cháo bào ngư',
    //     subtitle: 'Cháo',
    //     description: '',
    //     price: 49000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Bò Mỹ + Khoai tây',
    //     subtitle: '',
    //     description: '',
    //     price: 72000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Mì Chỉ HK sườn',
    //     subtitle: '',
    //     description: '',
    //     price: 52000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Mì Sườn',
    //     type:'',
    //     subtitle: '',
    //     description: '',
    //     price: 45000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cháo hải sản',
    //     type:'',
    //     subtitle: '',
    //     description: '',
    //     price: 45000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cơm chiên Ngọc Bích',
    //     subtitle: '',
    //     description: '',
    //     price: 97000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Cơm chiên trái thơm',
    //     subtitle: '',
    //     description: '',
    //     price: 97000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'MÌ xào Singapore',
    //     subtitle: '',
    //     description: '',
    //     price: 76000,
    //     dvt:'1/SET',
    //     restaurant,
    //   },
    //   {
    //     title: 'Lẩu nấm hải sản',
    //     subtitle: '',
    //     description: '',
    //     price: 390000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Súp hải vị rong biển',
    //     subtitle: '',
    //     description: '',
    //     price: 45000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Gỏi nhã viên',
    //     subtitle: '',
    //     description: '',
    //     price: 135000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Gà hấp sốt dầu hào',
    //     subtitle: 'GÀ',
    //     description: '',
    //     price: 296000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    //   {
    //     title: 'Gà hấp cải xanh',
    //     subtitle: 'GÀ',
    //     description: '',
    //     price: 360000,
    //     dvt:'1/Phần',
    //     restaurant,
    //   },
    // ])
    const kichikichi = await this.productRepository.create([
      {
        title: 'Cháo bào ngư',
        subtitle: 'Cháo',
        description: '',
        price: 49000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'Bò Mỹ + Khoai tây',
        subtitle: '',
        description: '',
        price: 72000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'Mì Chỉ HK sườn',
        subtitle: '',
        description: '',
        price: 52000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'Mì Sườn',
        type: '',
        subtitle: '',
        description: '',
        price: 45000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'Cháo hải sản',
        type: '',
        subtitle: '',
        description: '',
        price: 45000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'Cơm chiên Ngọc Bích',
        subtitle: '',
        description: '',
        price: 97000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'Cơm chiên trái thơm',
        subtitle: '',
        description: '',
        price: 97000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'MÌ xào Singapore',
        subtitle: '',
        description: '',
        price: 76000,
        dvt: '1/SET',
        restaurant,
      },
      {
        title: 'Lẩu nấm hải sản',
        subtitle: '',
        description: '',
        price: 390000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'Súp hải vị rong biển',
        subtitle: '',
        description: '',
        price: 45000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'Gỏi nhã viên',
        subtitle: '',
        description: '',
        price: 135000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'Gà hấp sốt dầu hào',
        subtitle: 'GÀ',
        description: '',
        price: 296000,
        dvt: '1/Phần',
        restaurant,
      },
      {
        title: 'Gà hấp cải xanh',
        subtitle: 'GÀ',
        description: '',
        price: 360000,
        dvt: '1/Phần',
        restaurant,
      },
    ])
    return await this.productRepository.save(kichikichi);
  }
  async findAll(page = 1, limit = 10): Promise<{ products: Product[]; total: number }> {
    const [products, total] = await this.productRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return { products, total };
  }
  async findOneWithCartItems(id: string): Promise<Product> {

    const findProduct = this.productRepository.findOne({ where: { id }, relations: ['cartItems'] });
    if (!findProduct) {
      throw new NotFoundException("Product not found");

    }
    return findProduct;
  }
  async findOne(id: string): Promise<Product> {

    const findProduct = this.productRepository.findOne({ where: { id } });
    if (!findProduct) {
      throw new NotFoundException("Product not found");

    }
    return findProduct;
  }
  async findByIds(id: string[]): Promise<{ products: Product[], count: number }> {
    const [products, count] = await this.productRepository.findAndCountBy({

      id: In(id)

    });
    if (count === 0) {
      throw new NotFoundException("Product not found in database");
    }
    return { products, count };
  }

  async addProducts(products: CreateProductsDto): Promise<void | any> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userService.findById(products.auth.id);
      const newProducts = products.products.map(product => ({
        ...product,
        user: user,
        restaurantId: products.restaurantId,
        categoryId: products.categoryId,
        status: products.status
      }));

      const createProduct = await this.productRepository.create(newProducts);
      await queryRunner.manager.save(createProduct);

      await queryRunner.commitTransaction();
      return {
        message: "Thêm các sản phẩm thành công"
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(
        {
          code: err.code,
          message: err.message
        }
      )
    } finally {
      await queryRunner.release();

    }
  }


  async create(productDto: CreateProductDto): Promise<Product | any> {

    try {

      const category = await this.CategoriesService.findOneNoRelation(productDto.categoryId);
      const restaurant = await this.restaurantService.findOne(productDto.restaurantId);
      //const user = await this.userService.findById(productDto.auth.id);
      const user = await this.userService.findById("0592f54e-2c12-4e7e-8eef-426121c15f54");
      if (!category) {
        throw new NotFoundException('Danh mục không tồn tại');
      }

      if (!restaurant) {
        throw new NotFoundException('Nhà hàng không tồn tại');
      }

      if (!user) {
        throw new NotFoundException("User not found || not accessible");
      }

      // // Kiểm tra xem sản phẩm đã được liên kết với nhà hàng khác chưa
      // const existingProduct = await this.productRepository.findOne({
      //   where: { title: productDto.title, restaurant: Not(restaurant) }
      // });
      // if (existingProduct) {
      //   throw new BadRequestException('Sản phẩm đã tồn tại trong một nhà hàng khác');
      // }

      const product = await this.productRepository.create({ ...productDto, status: productDto.status, category, restaurant, user, images: null, photo: productDto.photo });

      const saved = await this.productRepository.save(product);
      if (!saved) {
        throw new BadRequestException("save product failed")
      }
      if (productDto.images.length > 0) {
        if (saved) {
          const savedProductImages = productDto.images.map((image) => {
            return this._productImageRepository.create({
              imageUrl: image,
              product: saved
            });
          });

          await Promise.all(savedProductImages.map(image => this._productImageRepository.save(image)));

        }

      }
      return saved;

    } catch (error) {

      console.log("Create Product failed ! File deleting...");
      fs.unlinkSync(`public/${productDto.photo}`);
      productDto.images.map(image => {
        fs.unlinkSync(`public/${image}`);
      })
      console.log("Deleted!");

      throw new BadRequestException(error.message)
    }
    //   const category = await this.CategoriesService.findOne(productDto.categoryId);
    //   const restaurant = await this.restaurantService.findOne(productDto.restaurantId);
    //   const user = await this.userService.findById(productDto.auth.id);

    //   if (!category) {
    //     throw new NotFoundException('Danh mục không tồn tại');
    //   }

    //   if (!restaurant) {
    //     throw new NotFoundException('Nhà hàng không tồn tại');
    //   }

    //   if (!user) {
    //     throw new NotFoundException("User not found || not accessible");
    //   }

    //   // Kiểm tra xem sản phẩm đã được liên kết với nhà hàng khác chưa
    //   const existingProduct = await this.productRepository.findOne({
    //     where: { title: productDto.title, restaurant: Not(restaurant) }
    //   });
    //   if (existingProduct) {
    //     throw new BadRequestException('Sản phẩm đã tồn tại trong một nhà hàng khác');
    //   }

    //   const product = await this.productRepository.create({ ...productDto, status: productDto.status, category, restaurant, images: null ,photo: null });

    //   const saved = await this.productRepository.save(product);
    //   return saved;
    // } catch (error) {
    //   throw new BadRequestException(error.message)
    // }

  }

  // async update(id: string, productDto: UpdateProductDto): Promise<Product> {
  //   const product = await this.findOne(id);
  //   const merged = await this.productRepository.merge(product, productDto);
  //   const update = await this.productRepository.update(id, merged);
  //   if (!update) {
  //     throw new BadRequestException("Update product failed")
  //   }
  //   return merged;
  // }

  async remove(id: string): Promise<Object> {
    await this.findOne(id);
    await this.productRepository.delete(id);
    return {
      status: 200,
      message: 'DELETE PRODUCT SUCCESSFULLY'
    }
  }
}
