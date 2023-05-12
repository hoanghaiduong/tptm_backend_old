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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const users_service_1 = require("../users/users.service");
const Role_guard_1 = require("../auth/jwt/Role.guard");
const roles_decorator_1 = require("../roles/roles.decorator");
let RestaurantsService = class RestaurantsService {
    constructor(restaurantRepository, usersService) {
        this.restaurantRepository = restaurantRepository;
        this.usersService = usersService;
    }
    async getAllRestaurantsAndProduct() {
        return await this.restaurantRepository.find({
            relations: ['products']
        });
    }
    async findProductsByRestaurant(id) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id },
            relations: ['products']
        });
        if (!restaurant)
            throw new common_1.NotFoundException(`Restaurant ${id} not found`);
        return await restaurant.products;
    }
    async initData() {
        const init = await this.restaurantRepository.create([
            {
                name: 'Nhà hàng Neo Suki',
                address: '23 Đ. Phan Trung, Tân Mai, Thành phố Biên Hòa, Đồng Nai, Vietnam',
                description: 'Nhà hàng Neo Suki là một trong những nhà hàng ẩm thực đa dạng và độc đáo tại Việt Nam, nổi tiếng với phong cách ẩm thực kết hợp giữa ẩm thực Nhật Bản và Thái Lan. Với không gian sang trọng và ấm cúng, nhà hàng Neo Suki sẽ đưa bạn vào một thế giới ẩm thực đầy màu sắc và hương vị đặc trưng của hai quốc gia này.',
                photo: 'https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/339509182_6146017738826573_3717038535007902466_n.jpg?stp=dst-jpg_p960x960&_nc_cat=105&ccb=1-7&_nc_sid=e3f864&_nc_ohc=W_h5Sos4TawAX-esjVT&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfAJVNnN1NNZNr-4QnVFDcxXMsjozNIAekpS5xvKi4B5CA&oe=645E48D1',
                rating: 4.7,
                lat: 10.950190,
                lng: 106.821740
            },
            {
                name: 'Nhà hàng Bò Nướng FLAMME BUFFALO',
                address: '237 Đ. Trương Định, Tân Mai, Thành phố Biên Hòa, Đồng Nai, Vietnam',
                description: 'Giống như tên gọi của mình, nhà hàng Flamme Buffalo có cả một danh sách các món bò “không phải dạng vừa đâu”. Những món beefsteak, bò lúc lắc, bò né, bò cuộn nấm, bò cuộn phô mai, nui xào bò của quán đều có hương vị hết sức thơm ngon, bò mềm và đậm vị. Đặc biệt nhất phải kể đến các món bò thượng hạng nướng và món mới bò nướng lụi buffalo, từng sớ thịt bò tuyệt vời làm nức lòng thực khách.',
                photo: 'https://static.riviu.co/image/2020/12/10/4fef007b68ba6f80bcd168933881a386_output.jpeg',
                rating: 4.6,
                lat: 10.950190,
                lng: 106.821739
            },
            {
                name: 'Nhà hàng Lẩu tôm Năm Ri',
                address: 'WRWF+GQ9, Đ. Võ Thị Sáu, Quyết Thắng, Thành phố Biên Hòa, Đồng Nai, Vietnam',
                description: 'Nhắc đến các nhà hàng ở Đồng Nai nổi tiếng thì chắc chắn phải nhắc tới cái tên lẩu tôm Năm Ri. Để làm nên thương hiệu ngày hôm nay, nhà hàng đã ghi dấu ấn mạnh mẽ với khách hàng bằng món lẩu tôm đặc biệt và các món tôm siêu ngon khác.',
                photo: 'https://1.bp.blogspot.com/-OVrbMCvMcCU/XyYa-beW3wI/AAAAAAAEgIE/os-ZNcLnFagMP7KPn3alONH-i-holeugQCLcBGAsYHQ/s1600/lau-tom-5-ri.jpg',
                rating: 3.9,
                lat: 10.56,
                lng: 10.567
            },
            {
                name: 'Nhà hàng Nhã Viên',
                address: 'XR53+FGR, Bửu Long, Thành phố Biên Hòa, Đồng Nai, Vietnam',
                description: 'Nhắc đến Nhã Viên người ta liền hình dung ngay một nhà hàng lớn với khuôn viên, cách bày trí chẳng khác nào một khu du lịch sinh thái. Lấy cảm hứng từ ngự viên cổ xưa với diện tích rộng đến 5000 m2, từ cổng nhà hàng mang kiến trúc cổ điển cung điện xứ Huế, cho đến các gian nhà sàn, nhà rương đậm chất 3 miền Đất Việt. Bạn sẽ hoàn toàn choáng ngợp trước bãi cỏ xanh rộng lớn, những hòn non bộ cầu kỳ hay mấy cây cầu xây dựng công phu. Nhã Viên chính là nhà hàng có không gian ẩm thực thật sự rất tuyệt vời.',
                photo: 'https://cdn.jamja.vn/blog/wp-content/uploads/2019/10/khong-gian-nha-hang-Nha-Vien-768x548.jpg',
                rating: 4.2,
                lat: 10.56,
                lng: 10.567
            },
            {
                name: 'Nhà hàng Cây Dừa',
                address: '488 Cách Mạng Tháng 8, Quang Vinh, Thành phố Biên Hòa, Đồng Nai 810000, Vietnam',
                description: 'Nhà hàng Cây Dừa có cả một menu phong phú phục vụ nhiều món ăn Âu – Á và những món cơm mang đậm bản sắc quê hương. Nếu bạn mới đến đây lần đầu thì hãy thử thưởng thức các món như bò tiềm các vị, bông bí dồn thịt, gỏi củ hủ dừa, bao tử hầm tiêu. Đó là những món đặc sản cũng là niềm tự hào của quán. Ngoài ra, Cây Dừa còn một thực đơn các món hải sản tươi ngon khác cho bạn thoải mái lựa chọn.',
                photo: 'https://hotel84.com/hotel84-images/news/img1/cay-dua-dong-nai.jpg',
                rating: 4.3,
                lat: 10.56,
                lng: 10.567
            },
            {
                name: 'Nhà hàng Mongkok',
                address: 'K49, D10, Thống Nhất, Thành phố Biên Hòa, Đồng Nai, Vietnam',
                description: 'Đây là điểm đến lý tưởng của các bạn lỡ say đắm Ẩm thực Hoa, làn gió mới lạ ấy chính là nhà hàng Mongkok. Ngay từ khi đặt chân tới nhà hàng này bạn sẽ bất ngờ với lối kiến trúc đậm chất truyền thống người Hồng Kông bởi hai màu đỏ – đen cùng những chiếc đèn lồng đặc trưng. Nội thất gỗ và ánh đèn vàng lung linh càng làm không gian trở nên gần gũi, ấm cúng.',
                photo: 'https://cdn.jamja.vn/blog/wp-content/uploads/2019/10/khong-gian-nha-hang-Mongkok.jpg',
                rating: 4.1,
                lat: 10.56,
                lng: 10.567
            },
            {
                name: 'Nhà hàng Kaiserin',
                address: 'K36 Đ. Võ Thị Sáu, Thống Nhất, Thành phố Biên Hòa, Đồng Nai, Vietnam',
                description: 'Kaiserin là một trong những nhà hàng sang trọng bậc nhất tại Đồng Nai. Không những được thiết kế hiện đại, mà nội thất nơi đây còn toát lên một phong cách riêng mang đến không gian hoàn hảo cho khách hàng. Vì những lợi thế đó mà Kaiserin được rất nhiều người lựa chọn là nơi tổ chức các buổi party, hội họp công ty, bạn bè hay những bữa ăn gia đình vui vẻ.',
                photo: 'https://cdn.jamja.vn/blog/wp-content/uploads/2019/10/khong-gian-nha-hang-Kaiserin-768x576.png',
                rating: 4.1,
                lat: 10.56,
                lng: 10.567
            },
            ,
            {
                name: 'Nhà hàng Thiết Mộc Lan',
                address: 'XV46+XC2, Tân Hiệp, Thành phố Biên Hòa, Đồng Nai, Vietnam',
                description: 'Thiết Mộc Lan là nhà hàng mang phong cách đặc trưng của Biển. Nổi bật với cổng chào được thiết kế cầu kỳ, sử dụng cây xanh và bàn ghế gỗ làm chủ đạo, giống như cái tên Thiết Mộc Lan của mình, nhà hàng vừa mang cá tính mạnh mẽ lại có chút nhẹ nhàng, gần gũi. Bên trong nhà hàng vô cùng rộng rãi, bạn có thể thoải mái tận hưởng bầu không khí thoải mái ngoài trời lẫn không gian ấm cúng bên trong.',
                photo: 'https://cdn.jamja.vn/blog/wp-content/uploads/2019/10/khong-gian-nha-hang-Thiet-Moc-lan-768x457.jpg',
                rating: 3.9,
                lat: 10.56,
                lng: 10.567
            },
            {
                name: 'Gogi House',
                address: 'K29, KP7, Đ. Võ Thị Sáu, Thống Nhất, Thành phố Biên Hòa, Đồng Nai 810000, Vietnam',
                description: 'GoGi House ghi điểm bởi đảm bảo được cả về giá cả hợp lý lẩn chất lượng thịt tươi ngon. Hương vị thơm, ngon của những món sườn non bò Mỹ, nạc vai bò Mỹ, dẻ sườn tươi,...được ướp gia vị nhẹ giúp giữ trọn vẹn độ mềm, thơm và vị ngọt tự nhiên của thịt. Ngoài ra, còn có những món ăn đặc trưng Hàn Quốc khác cần kể đến là: mì lạnh Naengmyeon, bánh xèo Hàn Quốc Pa Jeon, tokpoki hải sản, lẩu kim chi… cùng nhiều món ăn hấp dẫn khác.',
                photo: 'https://www.dudeoi.com/wp-content/uploads/2022/08/bf.1.png',
                rating: 4.1,
                lat: 10.56,
                lng: 10.567
            },
            ,
            {
                name: 'Nhà hàng Kichi Kichi',
                address: 'K29, Khu Phố 7, Phường Thống Nhất, Biên Hòa, Đồng Nai',
                description: 'Kichi Kichi Võ Thị Sáu có 100 món ăn và món nhúng lẩu đa dạng: cổ bò Mỹ, lưỡi bò Mỹ, Nấm Hàn Quốc, rau tươi,.... với hương vị thơm ngon hấp dẫn, bao gồm những nguyên liệu: có đầu cá, khoanh cá, thịt bò, tôm, dồi trường, mực, bạch tuộc,...Những nguyên liệu này được lựa chọn kỹ càng, tươi ngon và có nguồn gốc, đảm bảo an toàn sức khỏe cho khách hàng. Những món nhúng bất kỳ ai đến Kichi Kichi Võ Thị Sáu cũng đều phải thử qua: ba chỉ bò Mỹ siêu ngọt mềm, cá hồi fillet thơm ngậy mềm tan hay râu mực, bạch tuộc giòn giòn...',
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNjEaX9uMCVbd_AEntstPLnA4fh6Zhs3Brkob1V_0q1cXoARI&s',
                rating: 4.1,
                lat: 10.56,
                lng: 10.567
            },
            {
                name: 'LEE BBQ - Ẩm Thực Hàn Quốc',
                address: 'BN2, LK 7 - LK8 (Liên Khu) Đường N1, Phường Thống Nhất, TP Biên Hòa',
                description: 'Có thể nói ẩm thực của xứ sở Kim Chi là một trong những nền ẩm thực đặc sắc nhất thế giới với vô số món ăn hấp dẫn, đa vị. Đối với người Hàn Quốc, để chế biến ra một bữa cơm ngon, đủ chất là vô cùng quan trọng, nét văn hóa đặc sắc này bạn có thể dễ dàng nhận ra qua những bộ phim Hàn Quốc. Nếu bạn cũng là người yêu thích nền ẩm thực ấy thì đừng bỏ qua  nhà hàng LEE BBQ với nhiều món ngon với mức giá hợp lý.',
                photo: 'https://alltop.vn/backend/media/images/posts/95/LEE_BBQ_-_Am_Thuc_Han_Quoc-5106.jpg',
                rating: 4.1,
                lat: 10.56,
                lng: 10.567
            },
            {
                name: 'Manwah - Taiwanese Hot Pot',
                address: 'Tầng 2A, Tháp B, Tòa nhà Pegasus, Số 53-55 Võ Thị Sáu, Phường Quyết Thắng, TP. Biên Hòa, Tỉnh Đồng Nai',
                description: 'Thực khách đến Manwah - Taiwanese Hot Pot sẽ được tự mình khám phá hành trình ẩm thực đặc sắc với nước lẩu ngọt vị tự nhiên, kết hợp hầm cùng các loại gia vị dậy mùi thơm đặc trưng của Đài Loan, bạn sẽ tìm thấy nhiều loại thịt bò khác nhau và rau củ đảm bảo an toàn thực phẩm. Sự kết hợp giữa nguồn nguyên liệu tươi ngon cùng với nước dùng đã tạo nên hương vị cho từng món ăn.',
                photo: 'https://alltop.vn/backend/media/images/posts/95/Manwah_-_Taiwanese_Hot_Pot-5109.jpg',
                rating: 4.3,
                lat: 10.56,
                lng: 10.567
            }, {
                name: 'Chu Suki Biên Hoà',
                address: '257 đường Võ Thị Sáu, TP. Biên Hòa, Tỉnh Đồng Nai',
                description: 'Nếu mọi người đang tìm kiếm một nhà hàng chuyên về lẩu nhúng với chất lượng tuyệt vời, được khách hàng khen ngợi mà giá vô cùng hợp lí thì đến Chu Suki Biên Hoà ngay. Đây sẽ là một lựa chọn đúng đắn và chắc chắn sẽ không làm bạn bạn không hề cảm thấy thất vọng. Khi đến với Chu Suki Biên Hoà mấy bạn đừng quên nhất định phải order cho bằng được một set lẩu theo ý thích của mình nhé.',
                photo: 'https://alltop.vn/backend/media/images/posts/95/Chu_Suki_Bien_Hoa-5115.jpg',
                rating: 4.7,
                lat: 10.56,
                lng: 10.567
            },
        ]);
        if (!init) {
            throw new common_1.BadRequestException("CREATE FAILED");
        }
        return await this.restaurantRepository.save(init);
    }
    async create(createRestaurantDto) {
        const user = await this.usersService.findById(createRestaurantDto.auth.id);
        const restaurant = await this.restaurantRepository.create(Object.assign(Object.assign({}, createRestaurantDto), { user }));
        return await this.restaurantRepository.save(restaurant);
    }
    async findAll() {
        return await this.restaurantRepository.find({
            loadEagerRelations: false
        });
    }
    async findOne(id) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id },
        });
        if (!restaurant) {
            throw new common_1.NotFoundException("Nhà hàng không tồn tại");
        }
        return restaurant;
    }
    async findOneWithAllProduct(id) {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!restaurant) {
            throw new common_1.NotFoundException("Restaurant not found");
        }
        return restaurant;
    }
    async update(id, updateRestaurantDto) {
        const restaurant = await this.findOne(id);
        const user = await this.usersService.findById(updateRestaurantDto.auth.id);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const mergeData = Object.assign(Object.assign({}, restaurant), updateRestaurantDto);
        const updatedRestaurant = await this.restaurantRepository.save(mergeData);
        return updatedRestaurant;
    }
    async response(id, message, status) {
        return new Promise((resolve, reject) => {
            switch (id) {
                case 0:
                    reject({
                        code: 400,
                        message: message,
                        status: status
                    });
                    break;
                case 1:
                    resolve({
                        code: 200,
                        message: message,
                        status: status
                    });
                    break;
                default:
                    break;
            }
        });
    }
    async remove(id) {
        await this.findOne(id);
        try {
            await this.restaurantRepository.delete(id);
            return await this.response(1, "Xoá nhà hàng thành công !", "SUCCESS");
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map