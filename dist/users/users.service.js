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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("./entities/User.entity");
const typeorm_2 = require("typeorm");
const sign_up_dto_1 = require("../auth/dto/sign-up.dto");
const sign_in_dto_1 = require("../auth/dto/sign-in.dto");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers(options) {
        const { page, limit } = options !== null && options !== void 0 ? options : {};
        if (page && limit) {
            const [data, count] = await this.userRepository.findAndCount({
                take: limit,
                skip: (page - 1) * limit,
            });
            return { data, count };
        }
        else {
            const data = await this.userRepository.find();
            return { data, count: data.length };
        }
    }
    async create(inputs) {
        const user = await this.userRepository.create(inputs);
        return this.userRepository.save(user);
    }
    async createSignUp(inputs) {
        const user = await this.userRepository.create(inputs);
        return this.userRepository.save(user);
    }
    async findById(id) {
        const user = this.userRepository.findOne({
            where: { id }
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async findByPhoneNumber(phoneNumber) {
        const user = await this.userRepository.findOne({ where: { phoneNumber } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async updateOTPCode(phoneNumber, otpCode, otpExpiration) {
        const user = await this.findByPhoneNumber(phoneNumber);
        if (user.otpExpiration && user.otpExpiration < new Date()) {
            user.otp = null;
            user.otpExpiration = null;
        }
        user.otp = otpCode;
        user.otpExpiration = otpExpiration;
        try {
            const isSaved = await this.userRepository.save(user);
            if (isSaved) {
                return new Promise((resolve, reject) => {
                    resolve({
                        message: 'Gửi mã OTP thành công !',
                        otp: `Mã OTP của bạn là: ${isSaved.otp}`,
                        status: 200
                    });
                });
            }
        }
        catch (error) {
            console.log(error);
            throw new Error('Failed to update OTP code');
        }
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const merged = this.userRepository.merge(user, updateUserDto);
        const updated = await this.userRepository.update(id, merged);
        if (!updated) {
            throw new common_1.BadRequestException("User update failed");
        }
        return merged;
    }
    async deleteById(id) {
        const userToDelete = await this.userRepository.findOne({
            where: { id }
        });
        if (!userToDelete) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        await this.userRepository.delete(id);
        return userToDelete;
    }
    async getUserByEmailOrPhoneNumber(param) {
        return this.userRepository.findOne({
            where: [{ email: param }, { phoneNumber: param }]
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map