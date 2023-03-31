import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/decoratos/roles.decoratos';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/return-category';
import { Category } from './model/category.entity';

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
}
