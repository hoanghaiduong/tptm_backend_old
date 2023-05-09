import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { swaggerConfig } from 'src/config/swagger.config';
import { database_config } from './database.config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Connection } from 'typeorm';
import { User } from 'src/users/entities/User.entity';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
    }),
    TypeOrmModule.forRoot(database_config),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  ],
  exports: [NestConfigModule, TypeOrmModule,ConfigModule],
})
export class ConfigModule {
  static async configSwaggerUI(app: any) {
    // Thêm Swagger vào ứng dụng của bạn
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }
  constructor(public connection: Connection) {
  }
}
