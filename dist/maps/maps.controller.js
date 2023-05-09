"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapsController = void 0;
const common_1 = require("@nestjs/common");
const maps_service_1 = require("./maps.service");
const axios_1 = require("axios");
const constants_1 = require("../config/constants");
const swagger_1 = require("@nestjs/swagger");
let MapsController = class MapsController {
    constructor(mapsService) {
        this.mapsService = mapsService;
    }
    async getCurrentLocation(public_ip) {
        const url = `http://api.ipstack.com/${public_ip}?access_key=${constants_1.ACCESS_KEY_TOKEN_IPSTACK}`;
        try {
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getPublicIp() {
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();
        return data.ip;
    }
    async findByAddress(address) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${decodeURIComponent(address)}&key=${constants_1.GOOGLE_MAPS_API_KEY}`;
        try {
            const response = await axios_1.default.get(url);
            return response.data.results;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async getByLatAndLong(lat, lng) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${constants_1.GOOGLE_MAPS_API_KEY}`;
        try {
            const response = await axios_1.default.get(url);
            return response.data.results;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async getPlaceDetails(place_id) {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${constants_1.GOOGLE_MAPS_API_KEY}`;
        try {
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async findNearby(lat, lng, radius = 1000) {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${constants_1.GOOGLE_MAPS_API_KEY}`;
        try {
            const response = await axios_1.default.get(url);
            return response.data.results;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
};
__decorate([
    (0, common_1.Get)('getCurrentLocation'),
    __param(0, (0, common_1.Query)('public_ip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "getCurrentLocation", null);
__decorate([
    (0, common_1.Get)('get/public-ip'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "getPublicIp", null);
__decorate([
    (0, common_1.Get)('getByAddress'),
    __param(0, (0, common_1.Query)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "findByAddress", null);
__decorate([
    (0, common_1.Get)('getByLatAndLong'),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('lng')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "getByLatAndLong", null);
__decorate([
    (0, common_1.Get)('place_id'),
    __param(0, (0, common_1.Query)('place_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "getPlaceDetails", null);
__decorate([
    (0, common_1.Get)('nearby'),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('lng')),
    __param(2, (0, common_1.Query)('radius')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "findNearby", null);
MapsController = __decorate([
    (0, swagger_1.ApiTags)("MAPS API"),
    (0, common_1.Controller)('maps'),
    __metadata("design:paramtypes", [maps_service_1.MapsService])
], MapsController);
exports.MapsController = MapsController;
//# sourceMappingURL=maps.controller.js.map