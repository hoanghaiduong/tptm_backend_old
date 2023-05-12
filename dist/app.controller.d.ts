import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        statusCode: number;
        message: string;
    };
}
