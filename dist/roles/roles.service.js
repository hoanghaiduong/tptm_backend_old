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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Role_entity_1 = require("./entities/Role.entity");
const typeorm_2 = require("typeorm");
let RolesService = class RolesService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async initData() {
        const roleNames = ['ADMIN', 'FARM', 'USER', 'RESTAURANT'];
        for (const roleName of roleNames) {
            const existingRole = await this.roleRepository.findOne({ where: { name: roleName } });
            if (existingRole) {
                await this.roleRepository.update(existingRole.id, existingRole);
            }
            else {
                const create = await this.roleRepository.create({ name: roleName });
                await this.roleRepository.save(create);
            }
        }
    }
    async create(createRoleDto) {
        const role = this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(role);
    }
    async findAll(page = 1, limit = 10) {
        const [data, count] = await this.roleRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
        });
        return { data, count };
    }
    async findAllRoleName() {
        const roles = await this.roleRepository.find();
        return roles.map((role) => role.name);
    }
    async findOne(id) {
        return await this.roleRepository.findOne({
            where: { id }
        });
    }
    async update(id, updateRoleDto) {
        const role = await this.roleRepository.findOne({
            where: { id },
        });
        if (!role) {
            throw new common_1.NotFoundException('Role not found');
        }
        this.roleRepository.merge(role, updateRoleDto);
        return await this.roleRepository.save(role);
    }
    async remove(id) {
        const role = await this.roleRepository.findOne({
            where: { id },
        });
        if (!role) {
            throw new common_1.NotFoundException('Role not found');
        }
        await this.roleRepository.remove(role);
        return true;
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map