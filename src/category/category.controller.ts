import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post('/create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<{ categories: Category[]; total: number; page?: number; limit?: number }> {
    let result;
    if (page !== undefined && limit !== undefined) {
      result = await this.categoryService.findAll({ page, limit, relations: ['products'] });
    } else {
      result = await this.categoryService.findAll({ relations: ['products'] });
    }
    return { categories: result.categories, total: result.total, page, limit };
  }


  @Get(':id')
  findOne(@Query('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Patch('update/:id')
  update(@Query('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('delete/:id')
  remove(@Query('id') id: string) {
    return this.categoryService.remove(id);
  }
}
