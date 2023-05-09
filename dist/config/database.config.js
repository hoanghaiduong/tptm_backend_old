"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database_config = void 0;
const constants_1 = require("./constants");
const database_config = {
    type: "mysql",
    host: constants_1.DB_HOST,
    port: parseInt(constants_1.DB_PORT),
    username: constants_1.DB_USERNAME,
    password: constants_1.DB_PASSWORD,
    database: constants_1.DB_NAME,
    entities: constants_1.ENTITIES,
    synchronize: true,
    dropSchema: false,
    migrations: [],
    autoLoadEntities: true,
};
exports.database_config = database_config;
//# sourceMappingURL=database.config.js.map