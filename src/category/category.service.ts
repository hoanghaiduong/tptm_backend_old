import { Injectable, NotFoundException, BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException({
          message: error.message
        })
      }
      else {
        throw new InternalServerErrorException();
      }
    }
  }


  async findAll(options?: { page?: number; limit?: number; relations?: string[] }): Promise<{ categories: Category[]; total: number; page?: number; limit?: number }> {
    const { page, limit, relations } = options ?? {};
    if (page !== undefined && limit !== undefined) {
      const [categories, total] = await this.categoryRepository.findAndCount({
        relations: relations,
        skip: (page - 1) * limit,
        take: limit,
      });
      return { categories, total, page, limit };
    } else {
      const categories = await this.categoryRepository.find({ relations: relations });
      return { categories, total: categories.length };
    }
  }



  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id }, relations: ['products'] });
  }
  async findOneNoRelation(id: string): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id }});
  }
  
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(
        'Category not found'
      )
    }
    const updated = await this.categoryRepository.merge(category, updateCategoryDto);
    if (!updated) {
      throw new BadRequestException('ERROR updating category')
    }
    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
