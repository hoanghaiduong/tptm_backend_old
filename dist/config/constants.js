"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCESS_KEY_TOKEN_IPSTACK = exports.GOOGLE_MAPS_API_KEY = exports.TWILIO_AUTH_TOKEN = exports.TWILIO_ACCOUNT_SID = exports.ENTITIES = exports.EXPIRES_TIME = exports.PORT_SERVER = exports.DB_NAME = exports.DB_TYPE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.JWT_SECRET_KEY = void 0;
const dotenv = require("dotenv");
const User_entity_1 = require("../users/entities/User.entity");
const Role_entity_1 = require("../roles/entities/Role.entity");
const product_entity_1 = require("../product/entities/product.entity");
const category_entity_1 = require("../category/entities/category.entity");
const order_entity_1 = require("../orders/entities/order.entity");
const restaurant_entity_1 = require("../restaurants/entities/restaurant.entity");
const review_entity_1 = require("../reviews/entities/review.entity");
const order_item_entity_1 = require("../order-item/entities/order-item.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
const cart_item_entity_1 = require("../cart-item/entities/cart-item.entity");
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
exports.JWT_SECRET_KEY = JWT_SECRET_KEY;
const DB_HOST = process.env.DB_HOST;
exports.DB_HOST = DB_HOST;
const DB_PORT = process.env.DB_PORT;
exports.DB_PORT = DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
exports.DB_USERNAME = DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_PASSWORD = DB_PASSWORD;
const DB_TYPE = process.env.DB_TYPE;
exports.DB_TYPE = DB_TYPE;
const DB_NAME = process.env.DB_NAME;
exports.DB_NAME = DB_NAME;
const PORT_SERVER = process.env.PORT_SERVER;
exports.PORT_SERVER = PORT_SERVER;
const EXPIRES_TIME = process.env.EXPIRES_TIME;
exports.EXPIRES_TIME = EXPIRES_TIME;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
exports.TWILIO_ACCOUNT_SID = TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
exports.TWILIO_AUTH_TOKEN = TWILIO_AUTH_TOKEN;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
exports.GOOGLE_MAPS_API_KEY = GOOGLE_MAPS_API_KEY;
const ACCESS_KEY_TOKEN_IPSTACK = process.env.ACCESS_KEY_TOKEN_IPSTACK;
exports.ACCESS_KEY_TOKEN_IPSTACK = ACCESS_KEY_TOKEN_IPSTACK;
const ENTITIES = [
    User_entity_1.User, Role_entity_1.Role, product_entity_1.Product, category_entity_1.Category, restaurant_entity_1.Restaurant, review_entity_1.Review,
    order_item_entity_1.OrderItem, order_entity_1.Order, cart_entity_1.Cart, cart_item_entity_1.CartItem
];
exports.ENTITIES = ENTITIES;
//# sourceMappingURL=constants.js.map