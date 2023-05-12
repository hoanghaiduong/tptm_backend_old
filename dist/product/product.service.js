"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const product_entity_1 = require("./entities/product.entity");
const category_service_1 = require("../category/category.service");
const restaurants_service_1 = require("../restaurants/restaurants.service");
const users_service_1 = require("../users/users.service");
const product_image_entity_1 = require("../product-image/entities/product-image.entity");
let ProductService = class ProductService {
    constructor(productRepository, CategoriesService, restaurantService, userService, dataSource, _productImageRepository) {
        this.productRepository = productRepository;
        this.CategoriesService = CategoriesService;
        this.restaurantService = restaurantService;
        this.userService = userService;
        this.dataSource = dataSource;
        this._productImageRepository = _productImageRepository;
    }
    async intiProducts() {
        const restaurant = await this.restaurantService.findOne('b08d0a36-d8db-428f-a78a-a3676704c802');
        if (!restaurant) {
            throw new common_1.BadRequestException('Cannot find restaurant');
        }
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
        ]);
        return await this.productRepository.save(kichikichi);
    }
    async findAll(page = 1, limit = 10) {
        const [products, total] = await this.productRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
        });
        return { products, total };
    }
    async findOneWithCartItems(id) {
        const findProduct = this.productRepository.findOne({ where: { id }, relations: ['cartItems'] });
        if (!findProduct) {
            throw new common_1.NotFoundException("Product not found");
        }
        return findProduct;
    }
    async findOne(id) {
        const findProduct = this.productRepository.findOne({ where: { id } });
        if (!findProduct) {
            throw new common_1.NotFoundException("Product not found");
        }
        return findProduct;
    }
    async findByIds(id) {
        const [products, count] = await this.productRepository.findAndCountBy({
            id: (0, typeorm_2.In)(id)
        });
        if (count === 0) {
            throw new common_1.NotFoundException("Product not found in database");
        }
        return { products, count };
    }
    async addProducts(products) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userService.findById(products.auth.id);
            const newProducts = products.products.map(product => (Object.assign(Object.assign({}, product), { user: user, restaurantId: products.restaurantId, categoryId: products.categoryId, status: products.status })));
            const createProduct = await this.productRepository.create(newProducts);
            await queryRunner.manager.save(createProduct);
            await queryRunner.commitTransaction();
            return {
                message: "Thêm các sản phẩm thành công"
            };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException({
                code: err.code,
                message: err.message
            });
        }
        finally {
            await queryRunner.release();
        }
    }
    async create(productDto) {
        try {
            const category = await this.CategoriesService.findOneNoRelation(productDto.categoryId);
            const restaurant = await this.restaurantService.findOne(productDto.restaurantId);
            const user = await this.userService.findById("0592f54e-2c12-4e7e-8eef-426121c15f54");
            if (!category) {
                throw new common_1.NotFoundException('Danh mục không tồn tại');
            }
            if (!restaurant) {
                throw new common_1.NotFoundException('Nhà hàng không tồn tại');
            }
            if (!user) {
                throw new common_1.NotFoundException("User not found || not accessible");
            }
            const product = await this.productRepository.create(Object.assign(Object.assign({}, productDto), { status: productDto.status, category, restaurant, user, images: null, photo: productDto.photo }));
            const saved = await this.productRepository.save(product);
            if (!saved) {
                throw new common_1.BadRequestException("save product failed");
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
        }
        catch (error) {
            console.log("Create Product failed ! File deleting...");
            fs.unlinkSync(`public/${productDto.photo}`);
            productDto.images.map(image => {
                fs.unlinkSync(`public/${image}`);
            });
            console.log("Deleted!");
            throw new common_1.BadRequestException(error.message);
        }
    }
    async remove(id) {
        await this.findOne(id);
        await this.productRepository.delete(id);
        return {
            status: 200,
            message: 'DELETE PRODUCT SUCCESSFULLY'
        };
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(5, (0, typeorm_1.InjectRepository)(product_image_entity_1.ProductImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        category_service_1.CategoryService,
        restaurants_service_1.RestaurantsService,
        users_service_1.UsersService,
        typeorm_2.DataSource,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map