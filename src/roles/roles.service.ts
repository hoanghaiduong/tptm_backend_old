import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/Role.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    //  private connection: Connection
  ) {

  }
  async initData() {
    const roleNames = ['ADMIN', 'FARM', 'USER', 'RESTAURANT'];
    for (const roleName of roleNames) {
      const existingRole = await this.roleRepository.findOne({ where: { name: roleName } });
      if (existingRole) {
        await this.roleRepository.update(existingRole.id, existingRole);
      } else {
        const create = await this.roleRepository.create({ name: roleName });
        await this.roleRepository.save(create)
      }
    }
  }


  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Role[]; count: number; }> {
    const [data, count] = await this.roleRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return { data, count };
  }

  // async findOne(param: string): Promise<Role> {
  //   return await this.roleRepository.findOne({
  //     where: [{ id: param }, { name: param }]
  //   });
  // }
  async findAllRoleName(): Promise<string[]> {
    const roles = await this.roleRepository.find();
    return roles.map((role) => role.name);
  }
  async findOne(id: string): Promise<Role> {
    return await this.roleRepository.findOne({
      where: { id }
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    this.roleRepository.merge(role, updateRoleDto);
    return await this.roleRepository.save(role);
  }

  async remove(id: string): Promise<boolean> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    await this.roleRepository.remove(role);
    return true;
  }
}
