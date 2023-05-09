import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/Role.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('ROLE API')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {

   }

   @Post('init')
   async initRole(){
    return this.rolesService.initData();
   }
  @Post('create')
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.rolesService.create(createRoleDto);
  }

  @Get('getRoles')
  
  async findAll(@Query('page') page: number, @Query('limit') limit: number): Promise<{ data: Role[]; count: number; }> {
    return await this.rolesService.findAll(page, limit);
  }

  @Get('get')
  async findOne(@Query('id') id: string): Promise<Role> {
    return await this.rolesService.findOne(id);
  }

  @Put('update')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return await this.rolesService.update(id, updateRoleDto);
  }

  @Delete('remove')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.rolesService.remove(id);
  }
}