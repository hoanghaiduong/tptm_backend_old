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
var ConfigModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("@nestjs/typeorm");
const swagger_config_1 = require("./swagger.config");
const database_config_1 = require("./database.config");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const typeorm_2 = require("typeorm");
const User_entity_1 = require("../users/entities/User.entity");
let ConfigModule = ConfigModule_1 = class ConfigModule {
    constructor(connection) {
        this.connection = connection;
    }
    static async configSwaggerUI(app) {
        const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.swaggerConfig);
        swagger_1.SwaggerModule.setup('api', app, document);
    }
};
ConfigModule = ConfigModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env.development', '.env'],
            }),
            typeorm_1.TypeOrmModule.forRoot(database_config_1.database_config),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: (req, file, cb) => {
                        cb(null, 'uploads/');
                    },
                    filename: (req, file, cb) => {
                        cb(null, `${Date.now()}-${file.originalname}`);
                    },
                }),
            }),
        ],
        exports: [config_1.ConfigModule, typeorm_1.TypeOrmModule, ConfigModule_1],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], ConfigModule);
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=ConfigModule.js.map