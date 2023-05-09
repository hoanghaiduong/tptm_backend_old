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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const gender_enum_1 = require("../enum/gender.enum");
const class_validator_1 = require("class-validator");
const Role_entity_1 = require("../../roles/entities/Role.entity");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, maxLength: 100 }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, maxLength: 100 }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, maxLength: 100, uniqueItems: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: gender_enum_1.GenderEnum, default: gender_enum_1.GenderEnum.LƯỠNG, nullable: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date', nullable: true }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, minLength: 8 }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: false, nullable: true }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "verified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: false, nullable: true }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "disabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, maxLength: 100, uniqueItems: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', nullable: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time', nullable: true }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "otpExpiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, maxLength: 100 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'RoleId must not be empty' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "roleId", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map