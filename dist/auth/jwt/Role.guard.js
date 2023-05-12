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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const constants_1 = require("../../config/constants");
const Role_entity_1 = require("../../roles/entities/Role.entity");
const roles_service_1 = require("../../roles/roles.service");
const users_service_1 = require("../../users/users.service");
let RolesGuard = class RolesGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, rolesService, jwtService, userService) {
        super();
        this.reflector = reflector;
        this.rolesService = rolesService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.BadRequestException("Missing token");
        }
        try {
            const requiredRoles = this.reflector.getAllAndOverride('roles', [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles) {
                return true;
            }
            const payload = await this.jwtService.verifyAsync(token, {
                secret: constants_1.JWT_SECRET_KEY,
                algorithms: ['HS256'],
            });
            request.user = payload;
            request.uid = payload.id;
            const uid = payload.id;
            const role = (await this.userService.findById(uid)).role;
            console.log(requiredRoles.includes(role.name));
            if (!requiredRoles.includes(role.name)) {
                throw new common_1.ForbiddenException('METHOD NOT ALLOWED');
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.UNAUTHORIZED);
        }
        return true;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        roles_service_1.RolesService,
        jwt_1.JwtService,
        users_service_1.UsersService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=Role.guard.js.map