import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from './config/ConfigModule';
import { ValidationPipe } from '@nestjs/common';
import { DatabaseExceptionFilter } from './shared/database-error-filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    rawBody: true,
  });
  app.useBodyParser('json', { limit: '10mb' });
  app.useGlobalFilters(new DatabaseExceptionFilter());
  await ConfigModule.configSwaggerUI(app);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT_SERVER);

}
bootstrap();
