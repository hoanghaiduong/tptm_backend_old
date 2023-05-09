import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PORT_SERVER } from './config/constants';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) { }
  //code 
  getHello(): string {
    return `Hello World! The database host is ${PORT_SERVER}`;
  }
}
