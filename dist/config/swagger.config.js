"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API documentation for your application.')
    .setVersion('3.0')
    .addBearerAuth()
    .build();
exports.swaggerConfig = swaggerConfig;
//# sourceMappingURL=swagger.config.js.map