import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/jwt/Role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesService } from 'src/roles/roles.service';
@ApiTags('USER API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,private roleService:RolesService) { }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('getAllUsers')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAllUsers(
    @Query('page') page: number | null,
    @Query('limit') limit: number | null
  ) {
    let users, count;
    if (page && limit) {
      const result = await this.usersService.getAllUsers({ page, limit });
      users = result.data;
      count = result.count;
    } else {
      users = await this.usersService.getAllUsers();
      count = users.length;
    }
    return {
      data: users,
      meta: {
        count,
        page,
        limit,
        totalPages: limit ? Math.ceil(count / limit) : 1
      }
    };
  }
  @Get('getUserById')
  @ApiQuery({ name: 'id', required: true })
  async findOne(@Query('id') id: string) {
    return this.usersService.findById(id);
  }
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch('update-role')
  @ApiQuery({ name: 'roleId', required: true })
  async updateRole(@Query('roleId') roleId: string, @Query('userId') userId: string) {
    const role= await this.roleService.findOne(roleId);
    if(!role)
    {
      throw new NotFoundException("Role not found");
    }
    return await this.usersService.update(userId, {
      roleId,
      role
    })
  }
  @Patch('update')
  @ApiQuery({ name: 'id', required: true })
  update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete')
  @ApiQuery({ name: 'id', required: true })
  async remove(@Query('id') id: string) {
    return this.usersService.deleteById(id);
  }
}
