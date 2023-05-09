import { Connection } from 'typeorm';
export declare class ConfigModule {
    connection: Connection;
    static configSwaggerUI(app: any): Promise<void>;
    constructor(connection: Connection);
}
