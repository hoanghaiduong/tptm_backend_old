"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const ConfigModule_1 = require("./config/ConfigModule");
const common_1 = require("@nestjs/common");
const database_error_filter_1 = require("./shared/database-error-filter");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
    });
    app.useBodyParser('json', { limit: '10mb' });
    app.useGlobalFilters(new database_error_filter_1.DatabaseExceptionFilter());
    await ConfigModule_1.ConfigModule.configSwaggerUI(app);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    await app.listen(process.env.PORT_SERVER);
}
bootstrap();
//# sourceMappingURL=main.js.map