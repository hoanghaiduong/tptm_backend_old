"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let DatabaseExceptionFilter = class DatabaseExceptionFilter {
    catch(exception, host, status) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const statusCode = status || 400;
        const message = `Lỗi cơ sở dữ liệu: ${exception.message}`;
        response.status(statusCode).json({
            statusCode: statusCode,
            message: message,
        });
    }
};
DatabaseExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], DatabaseExceptionFilter);
exports.DatabaseExceptionFilter = DatabaseExceptionFilter;
//# sourceMappingURL=database-error-filter.js.map