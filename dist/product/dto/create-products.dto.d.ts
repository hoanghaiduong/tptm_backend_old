import { Product } from '../entities/product.entity';
import { AuthPayload } from 'src/auth/interfaces/auth-payload.interface';
export declare class CreateProductsDto {
    auth: AuthPayload;
    products: Product[];
    categoryId: string;
    restaurantId: string;
    status: string;
}
