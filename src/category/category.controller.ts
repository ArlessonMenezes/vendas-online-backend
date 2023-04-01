import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { Roles } from 'src/decoratos/roles.decoratos';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ReturnCategoryDto } from './dtos/return-category';

@Roles(UserTypeEnum.User, UserTypeEnum.Admin)
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ){}

  @Get()
  async findAllCategories() {
    return (await this.categoryService.findAllCategories()).map(
      (category) => new ReturnCategoryDto(category)
    )
  }

  @Roles(UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategoryDto
  ){
    return this.categoryService.createCategory(createCategory);
  }

  @Roles(UserTypeEnum.Admin)
  @Get()
  async findCategoryByName(@Query() category: string) {
    return new ReturnCategoryDto(
      await this.categoryService.findCategoryByName(category)
    );
  }
}
