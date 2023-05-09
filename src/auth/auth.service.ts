import { Injectable, UnauthorizedException, BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { User } from 'src/users/entities/User.entity';
import { SignInDto } from './dto/sign-in.dto';
import { TwilioService } from 'nestjs-twilio';
import { SignUpDto } from './dto/sign-up.dto';
import { RolesService } from 'src/roles/roles.service';
import { VerifyotpDTO } from './dto/verified-otp.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private twilioService: TwilioService,
        private roleService: RolesService,
    ) { }
    async generateAccessToken(user: User): Promise<string> {
        const { id, roleId } = user;
        const payload: AuthPayload = { id, roleId };
        const accessToken = await this.jwtService.signAsync(payload);
        return accessToken;
    }
    async generateRefreshToken(user: User): Promise<string> {
        const { id, roleId } = user;
        const payload: AuthPayload = { id, roleId };
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });
        return refreshToken;
    }




    async verifiedOTP(payload: VerifyotpDTO): Promise<Object> {

        const user = await this.userService.findByPhoneNumber(payload.phoneNumber);
        if (!user) {
            throw new UnauthorizedException('Invalid phone number');
        }
        // Check if OTP is expired
        if (user.otpExpiration && user.otpExpiration < new Date()) {
            throw new UnauthorizedException('OTP has expired');
        }

        if (user.otp !== payload.otp) {
            throw new UnauthorizedException('Invalid OTP');
        }

        const verifiedUpdate = await this.userService.update(user.id, {
            verified: true
        })
        if (!verifiedUpdate) {
            throw new BadRequestException('UPDATE VERIFIED FAILED');
        }
        return new Promise((resolve, reject) => {
            resolve({
                message: 'Xác minh số điện thoại với mã otp thành công !',
                statusCode: 200,
            })

        })

    }
    async findUser(userId: string): Promise<User> {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async forgotPassword(payload: any): Promise<Object> {
        const user = await this.findUser(payload.id)
        const sendOtpCode = await this.sendOtpCode(user.phoneNumber)
        if (!sendOtpCode) {
            throw new BadRequestException('Send OTP Code Failed forgot password failed');
        }
        return {
            message: 'Gửi yêu cầu đặt lại mật khẩu thành công !',
            status: 200,
            res: sendOtpCode
        };

    }
    async resetPassword(requestDTO: ResetPasswordDTO): Promise<Object> {

        const user = await this.findUser(requestDTO.auth.id);


        const isPasswordCorrect = await user.comparePassword(requestDTO.password_old);
        if (!isPasswordCorrect) {
            throw new BadRequestException('Invalid password_old .');
        }
        const isOtpCorrect = user.otp === requestDTO.otp && user.otpExpiration >= new Date();
        if (!isOtpCorrect) {
            throw new BadRequestException('Invalid   OTP.');
        }
        const updatePasswordHash = await user.hashUpdatedPassword(requestDTO.password_new);
        const updatePassword = await this.userService.update(user.id, {
            ...user,
            password: updatePasswordHash,
        })

        if (!updatePassword) {
            throw new BadRequestException("Reset password failed");
        }
        return {
            message: 'Reset password successfully ',
            status: 200,
            data: updatePassword
        }

    }
    async login(payload: SignInDto): Promise<{ data: User, access_token: string; refresh_token: string; }> {

        const user = await this.userService.findByPhoneNumber(payload.phoneNumber);
        if (!user || !(await user.comparePassword(payload.password))) {
            throw new UnauthorizedException('Invalid phone number or password');
        }
        const check = await this.userService.updateOTPCode(payload.phoneNumber, null, null);
        if (!check) {
            throw new HttpException('Updatec OTP Code failed', HttpStatus.BAD_REQUEST);
        }
        if (!user.verified) {
            throw new UnauthorizedException('Account is not verified');
        }
        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);
        return {
            data: user,
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async register(payload: SignUpDto): Promise<User> {
        const email = payload.email;
        const phoneNumber = payload.phoneNumber;

        if (!email && !phoneNumber) {
            throw new HttpException('Email or phone number must be provided', HttpStatus.BAD_REQUEST);
        }
        const existingUser = await this.userService.getUserByEmailOrPhoneNumber(email || phoneNumber);
        if (existingUser) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const role = await this.roleService.findOne(payload.roleId);
        if (!role) {
            throw new HttpException('Invalid role', HttpStatus.BAD_REQUEST);
        }

        return await this.userService.create({ ...payload, role });
    }

    async sendOtpCode(phoneNumber: string): Promise<Object> {

        // Generate OTP code
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        // Set OTP expiration time to 5 minutes
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
        // Save OTP to database
        return await this.userService.updateOTPCode(phoneNumber, otpCode, otpExpiration);

        // Send OTP message with Twilio
        // const message = await this.twilioService.client.messages.create({
        //     from: '+15076323439',
        //     to: phoneNumber,
        //     body: `Your OTP code is ${otpCode}`,
        // });

        // return new Promise<Object>((resolve, reject) => {
        //     resolve({
        //         status: message.status,
        //         message: message.body
        //     });
        //     reject({
        //         status: message.errorCode,
        //         message: message.errorMessage
        //     });
        // })


    }

}
