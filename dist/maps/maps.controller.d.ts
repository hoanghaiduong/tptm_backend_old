import { MapsService } from './maps.service';
export declare class MapsController {
    private readonly mapsService;
    constructor(mapsService: MapsService);
    getCurrentLocation(public_ip: string): Promise<any>;
    getPublicIp(): Promise<string>;
    findByAddress(address: string): Promise<any>;
    getByLatAndLong(lat: number, lng: number): Promise<any>;
    getPlaceDetails(place_id: string): Promise<any>;
    findNearby(lat: number, lng: number, radius?: number): Promise<any>;
}
