import * as dotenv from 'dotenv';
import { User } from '../users/entities/User.entity';
import { Role } from '../roles/entities/Role.entity';
import { Product } from 'src/product/entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

import { Order } from 'src/orders/entities/order.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';


dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_TYPE = process.env.DB_TYPE;
const DB_NAME = process.env.DB_NAME;
const PORT_SERVER = process.env.PORT_SERVER;
const EXPIRES_TIME = process.env.EXPIRES_TIME;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const GOOGLE_MAPS_API_KEY=process.env.GOOGLE_MAPS_API_KEY;
const ACCESS_KEY_TOKEN_IPSTACK=process.env.ACCESS_KEY_TOKEN_IPSTACK;
const ENTITIES = [
    User, Role, Product, Category, Restaurant,Review,
    OrderItem,Order,Cart,CartItem,ProductImage
]

// const ENTITIES = ['dist/**/*.entity{.ts,.js}'];
// const MIGRATIONS = ["dist/database/migrations/*.js"];
// const CLI_DB = {
//     cli: {
//         migrationsDir: "src/database/migrations"
//     }
// }
export {
    JWT_SECRET_KEY,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_TYPE,
    DB_NAME,
    PORT_SERVER,
    EXPIRES_TIME,
    ENTITIES,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    GOOGLE_MAPS_API_KEY,
    ACCESS_KEY_TOKEN_IPSTACK
    // ENTITIES,
    // MIGRATIONS,
    // CLI_DB
}