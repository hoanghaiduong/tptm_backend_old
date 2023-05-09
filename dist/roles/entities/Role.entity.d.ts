import { User } from '../../users/entities/User.entity';
export declare class Role {
    id: string;
    name: string;
    users: User[];
}
