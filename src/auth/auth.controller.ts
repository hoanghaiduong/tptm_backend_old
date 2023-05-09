import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { SignInDto } from './dto/sign-in.dto';

import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './jwt/auth.guard';
import { VerifyotpDTO } from './dto/verified-otp.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from './jwt/Role.guard';
import { ResetPasswordDTO } from './dto/reset-password.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private roleService: RolesService
  ) { }
  @Post('register')
  async registerUser(@Body() input: SignUpDto) {
    return await this.authService.register(input);
  }
  @Post('login')
  async login(@Request() req, @Body() signInDTO: SignInDto) {
    return await this.authService.login(signInDTO);
  }
  @Post('otp')
  async sendOtp(@Query('phoneNumber') phoneNumber: string) {
    const decodedPhoneNumber = decodeURIComponent(phoneNumber);
    return this.authService.sendOtpCode(decodedPhoneNumber);
  }
  @Post('verified')
  async verifiedOTP(@Body() verifiedOTP: VerifyotpDTO) {
    return await this.authService.verifiedOTP(verifiedOTP);

  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('forgot-password')
  async forgotPassword(@Request() req) {
    return await this.authService.forgotPassword(req.user);
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('reset-password')
  async resetPassword(@Request() req,@Body() resetDTO: ResetPasswordDTO) {
   
    return await this.authService.resetPassword({ ...resetDTO, auth: req.user });
  }
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async profile(@Request() req): Promise<any> {
    return req.user;
  }

  // handle login
  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // async login(@Request() request): Promise<any> {
  //     return this.authService.login(request.user);
  // }

  // @UseGuards(AuthenticationGuard)
  // @Get('users/:id')
  // async getUserById(@Param() params): Promise<UserEntity> {
  //     const user = await this.userService.findById(params.id);
  //     return user;
  // }


}
