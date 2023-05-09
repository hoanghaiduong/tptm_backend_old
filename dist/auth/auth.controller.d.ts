import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { SignInDto } from './dto/sign-in.dto';
import { VerifyotpDTO } from './dto/verified-otp.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
export declare class AuthController {
    private userService;
    private authService;
    private roleService;
    constructor(userService: UsersService, authService: AuthService, roleService: RolesService);
    registerUser(input: SignUpDto): Promise<import("../users/entities/User.entity").User>;
    login(req: any, signInDTO: SignInDto): Promise<{
        data: import("../users/entities/User.entity").User;
        access_token: string;
        refresh_token: string;
    }>;
    sendOtp(phoneNumber: string): Promise<Object>;
    verifiedOTP(verifiedOTP: VerifyotpDTO): Promise<Object>;
    forgotPassword(req: any): Promise<Object>;
    resetPassword(req: any, resetDTO: ResetPasswordDTO): Promise<Object>;
    profile(req: any): Promise<any>;
}
