import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }
  @Post('initData')
  async initData() {
    return await this.reviewsService.initData();
  }
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Query('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  update(@Query('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Query('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
