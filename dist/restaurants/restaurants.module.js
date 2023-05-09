"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RestaurantsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsModule = void 0;
const common_1 = require("@nestjs/common");
const restaurants_service_1 = require("./restaurants.service");
const restaurants_controller_1 = require("./restaurants.controller");
const typeorm_1 = require("@nestjs/typeorm");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const users_service_1 = require("../users/users.service");
const users_module_1 = require("../users/users.module");
const roles_module_1 = require("../roles/roles.module");
const roles_service_1 = require("../roles/roles.service");
const jwt_1 = require("@nestjs/jwt");
let RestaurantsModule = RestaurantsModule_1 = class RestaurantsModule {
};
RestaurantsModule = RestaurantsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([restaurant_entity_1.Restaurant]),
            users_module_1.UsersModule,
            roles_module_1.RolesModule
        ],
        controllers: [restaurants_controller_1.RestaurantsController],
        providers: [restaurants_service_1.RestaurantsService, users_service_1.UsersService, roles_service_1.RolesService, jwt_1.JwtService],
        exports: [RestaurantsModule_1, typeorm_1.TypeOrmModule]
    })
], RestaurantsModule);
exports.RestaurantsModule = RestaurantsModule;
//# sourceMappingURL=restaurants.module.js.map