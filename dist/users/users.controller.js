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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const Role_guard_1 = require("../auth/jwt/Role.guard");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_service_1 = require("../roles/roles.service");
let UsersController = class UsersController {
    constructor(usersService, roleService) {
        this.usersService = usersService;
        this.roleService = roleService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async findAllUsers(page, limit) {
        let users, count;
        if (page && limit) {
            const result = await this.usersService.getAllUsers({ page, limit });
            users = result.data;
            count = result.count;
        }
        else {
            users = await this.usersService.getAllUsers();
            count = users.length;
        }
        return {
            data: users,
            meta: {
                count,
                page,
                limit,
                totalPages: limit ? Math.ceil(count / limit) : 1
            }
        };
    }
    async findOne(id) {
        return this.usersService.findById(id);
    }
    async updateRole(roleId, userId) {
        const role = await this.roleService.findOne(roleId);
        if (!role) {
            throw new common_1.NotFoundException("Role not found");
        }
        return await this.usersService.update(userId, {
            roleId,
            role
        });
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async remove(id) {
        return this.usersService.deleteById(id);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getAllUsers'),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Get)('getUserById'),
    (0, swagger_1.ApiQuery)({ name: 'id', required: true }),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(Role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)('update-role'),
    (0, swagger_1.ApiQuery)({ name: 'roleId', required: true }),
    __param(0, (0, common_1.Query)('roleId')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Patch)('update'),
    (0, swagger_1.ApiQuery)({ name: 'id', required: true }),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, swagger_1.ApiQuery)({ name: 'id', required: true }),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('USER API'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, roles_service_1.RolesService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map