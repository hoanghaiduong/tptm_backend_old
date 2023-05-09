import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/User.entity';
import { SignInDto } from './dto/sign-in.dto';
import { TwilioService } from 'nestjs-twilio';
import { SignUpDto } from './dto/sign-up.dto';
import { RolesService } from 'src/roles/roles.service';
import { VerifyotpDTO } from './dto/verified-otp.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
export declare class AuthService {
    private jwtService;
    private userService;
    private twilioService;
    private roleService;
    constructor(jwtService: JwtService, userService: UsersService, twilioService: TwilioService, roleService: RolesService);
    generateAccessToken(user: User): Promise<string>;
    generateRefreshToken(user: User): Promise<string>;
    verifiedOTP(payload: VerifyotpDTO): Promise<Object>;
    findUser(userId: string): Promise<User>;
    forgotPassword(payload: any): Promise<Object>;
    resetPassword(requestDTO: ResetPasswordDTO): Promise<Object>;
    login(payload: SignInDto): Promise<{
        data: User;
        access_token: string;
        refresh_token: string;
    }>;
    register(payload: SignUpDto): Promise<User>;
    sendOtpCode(phoneNumber: string): Promise<Object>;
}
