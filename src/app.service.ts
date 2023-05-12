import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PORT_SERVER } from './config/constants';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) { }
  
}
