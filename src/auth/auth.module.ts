import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { TwilioCustomModule } from './twilio/twilioModule.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/User.entity';
import { Role } from 'src/roles/entities/Role.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role]),
    PassportModule,
    TwilioCustomModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),

  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    RolesService

  ],  
  exports: [AuthModule]
})
export class AuthModule{}
