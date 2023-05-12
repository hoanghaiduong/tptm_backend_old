import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from './config/ConfigModule';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './shared/database-error-filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.useBodyParser('json', { limit: '10mb' });
  app.useGlobalFilters(new DatabaseExceptionFilter());
  await ConfigModule.configSwaggerUI(app);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // Sử dụng middleware express.static để phục vụ các tệp tĩnh
  app.useStaticAssets(join(__dirname, '..', 'public')); // cấu hình thư mục chứa tài nguyên tĩnh
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // cấu hình thư mục chứa các view template
  app.setViewEngine('hbs'); // cấu hình view engine sử dụng Handlebars
  await app.listen(process.env.PORT_SERVER);

}
bootstrap();
