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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const User_entity_1 = require("../users/entities/User.entity");
const nestjs_twilio_1 = require("nestjs-twilio");
const roles_service_1 = require("../roles/roles.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
let AuthService = class AuthService {
    constructor(jwtService, userService, twilioService, roleService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.twilioService = twilioService;
        this.roleService = roleService;
    }
    async generateAccessToken(user) {
        const { id, roleId } = user;
        const payload = { id, roleId };
        const accessToken = await this.jwtService.signAsync(payload);
        return accessToken;
    }
    async generateRefreshToken(user) {
        const { id, roleId } = user;
        const payload = { id, roleId };
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });
        return refreshToken;
    }
    async verifiedOTP(payload) {
        const user = await this.userService.findByPhoneNumber(payload.phoneNumber);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid phone number');
        }
        if (user.otpExpiration && user.otpExpiration < new Date()) {
            throw new common_1.UnauthorizedException('OTP has expired');
        }
        if (user.otp !== payload.otp) {
            throw new common_1.UnauthorizedException('Invalid OTP');
        }
        const verifiedUpdate = await this.userService.update(user.id, {
            verified: true
        });
        if (!verifiedUpdate) {
            throw new common_1.BadRequestException('UPDATE VERIFIED FAILED');
        }
        return new Promise((resolve, reject) => {
            resolve({
                message: 'Xác minh số điện thoại với mã otp thành công !',
                statusCode: 200,
            });
        });
    }
    async findUser(userId) {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async forgotPassword(payload) {
        const user = await this.findUser(payload.id);
        const sendOtpCode = await this.sendOtpCode(user.phoneNumber);
        if (!sendOtpCode) {
            throw new common_1.BadRequestException('Send OTP Code Failed forgot password failed');
        }
        return {
            message: 'Gửi yêu cầu đặt lại mật khẩu thành công !',
            status: 200,
            res: sendOtpCode
        };
    }
    async resetPassword(requestDTO) {
        const user = await this.findUser(requestDTO.auth.id);
        const isPasswordCorrect = await user.comparePassword(requestDTO.password_old);
        if (!isPasswordCorrect) {
            throw new common_1.BadRequestException('Invalid password_old .');
        }
        const isOtpCorrect = user.otp === requestDTO.otp && user.otpExpiration >= new Date();
        if (!isOtpCorrect) {
            throw new common_1.BadRequestException('Invalid   OTP.');
        }
        const updatePasswordHash = await user.hashUpdatedPassword(requestDTO.password_new);
        const updatePassword = await this.userService.update(user.id, Object.assign(Object.assign({}, user), { password: updatePasswordHash }));
        if (!updatePassword) {
            throw new common_1.BadRequestException("Reset password failed");
        }
        return {
            message: 'Reset password successfully ',
            status: 200,
            data: updatePassword
        };
    }
    async login(payload) {
        const user = await this.userService.findByPhoneNumber(payload.phoneNumber);
        if (!user || !(await user.comparePassword(payload.password))) {
            throw new common_1.UnauthorizedException('Invalid phone number or password');
        }
        const check = await this.userService.updateOTPCode(payload.phoneNumber, null, null);
        if (!check) {
            throw new common_1.HttpException('Updatec OTP Code failed', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!user.verified) {
            throw new common_1.UnauthorizedException('Account is not verified');
        }
        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);
        return {
            data: user,
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async register(payload) {
        const email = payload.email;
        const phoneNumber = payload.phoneNumber;
        if (!email && !phoneNumber) {
            throw new common_1.HttpException('Email or phone number must be provided', common_1.HttpStatus.BAD_REQUEST);
        }
        const existingUser = await this.userService.getUserByEmailOrPhoneNumber(email || phoneNumber);
        if (existingUser) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const role = await this.roleService.findOne(payload.roleId);
        if (!role) {
            throw new common_1.HttpException('Invalid role', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.userService.create(Object.assign(Object.assign({}, payload), { role }));
    }
    async sendOtpCode(phoneNumber) {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
        return await this.userService.updateOTPCode(phoneNumber, otpCode, otpExpiration);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        nestjs_twilio_1.TwilioService,
        roles_service_1.RolesService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map