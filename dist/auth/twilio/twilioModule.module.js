"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioCustomModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_twilio_1 = require("nestjs-twilio");
const constants_1 = require("../../config/constants");
let TwilioCustomModule = class TwilioCustomModule {
};
TwilioCustomModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_twilio_1.TwilioModule.forRoot({
                accountSid: constants_1.TWILIO_ACCOUNT_SID,
                authToken: constants_1.TWILIO_AUTH_TOKEN,
            }),
        ],
        exports: [nestjs_twilio_1.TwilioModule]
    })
], TwilioCustomModule);
exports.TwilioCustomModule = TwilioCustomModule;
//# sourceMappingURL=twilioModule.module.js.map