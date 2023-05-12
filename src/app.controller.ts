import { BadRequestException, Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
@Controller()
@ApiTags('TEST API')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('404')
  getHello() {
    try {
      return {
        statusCode:200,
        message: "Hello everyone"
      }
    } catch (error) {

      throw new BadRequestException(error.message)
    }
  }
}
