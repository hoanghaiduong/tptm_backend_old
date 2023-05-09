import { AuthPayload } from 'src/auth/interfaces/auth-payload.interface';
export declare class CreateProductDto {
    auth: AuthPayload;
    title: string;
    subtitle?: string;
    price: number;
    description: string;
    photo: string;
    quantity: number;
    releaseDate?: string;
    status: null | string;
    isPopular: boolean;
    isFeatured: boolean;
    categoryId: string;
    restaurantId: string;
}
