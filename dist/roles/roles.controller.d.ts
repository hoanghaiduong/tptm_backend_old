import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/Role.entity';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    initRole(): Promise<void>;
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(page: number, limit: number): Promise<{
        data: Role[];
        count: number;
    }>;
    findOne(id: string): Promise<Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: string): Promise<boolean>;
}
