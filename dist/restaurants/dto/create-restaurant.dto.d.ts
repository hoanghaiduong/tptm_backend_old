import { AuthPayload } from 'src/auth/interfaces/auth-payload.interface';
export declare class CreateRestaurantDto {
    name: string;
    address: string;
    lat: number;
    lng: number;
    rating: number;
    description: string;
    photo: string;
    auth: AuthPayload;
}
