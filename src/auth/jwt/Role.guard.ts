import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JWT_SECRET_KEY } from 'src/config/constants';
import { Role } from 'src/roles/entities/Role.entity';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
    constructor(
        private readonly reflector: Reflector,
        private readonly rolesService: RolesService,
        private jwtService: JwtService,
        private userService: UsersService,
    ) { super(); }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new BadRequestException("Missing token");
        }
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles) {
                return true;
            }

            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: JWT_SECRET_KEY,
                    algorithms: ['HS256'],

                }
            );
            request.user = payload;
            request.uid = payload.id;
            const uid = payload.id;
            const role = (await this.userService.findById(uid)).role;

            console.log(requiredRoles.includes(role.name))
            if (!requiredRoles.includes(role.name)) {
                throw new ForbiddenException('METHOD NOT ALLOWED')
            }

            // const roles = await this.rolesService.findAll();
            // const userRoleName = findRoleUser.name;
            // const roleNames = roles.data.map(role => role.name);
            // console.log('con cac',roles,userRoleName,roleNames);
            // return requiredRoles.every(role => roleNames.includes(userRoleName));
        } catch (error) {

            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
        }
        //
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}


