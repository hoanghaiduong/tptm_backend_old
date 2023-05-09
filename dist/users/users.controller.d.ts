import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';
export declare class UsersController {
    private readonly usersService;
    private roleService;
    constructor(usersService: UsersService, roleService: RolesService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/User.entity").User>;
    findAllUsers(page: number | null, limit: number | null): Promise<{
        data: any;
        meta: {
            count: any;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("./entities/User.entity").User>;
    updateRole(roleId: string, userId: string): Promise<import("./entities/User.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/User.entity").User>;
    remove(id: string): Promise<import("./entities/User.entity").User>;
}
