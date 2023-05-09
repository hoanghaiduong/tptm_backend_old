import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/Role.entity';
import { Repository } from 'typeorm';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    initData(): Promise<void>;
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(page?: number, limit?: number): Promise<{
        data: Role[];
        count: number;
    }>;
    findAllRoleName(): Promise<string[]>;
    findOne(id: string): Promise<Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: string): Promise<boolean>;
}
