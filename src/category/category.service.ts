import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './model/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ){}

  async findAllCategories() {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) 
      throw new NotFoundException('categories empty')

    return categories;
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.findCategoryByName(
      createCategoryDto.name
    ).catch(() => undefined);

    if (category) throw new BadRequestException(`category ${category.name} already exists`)

    const createCategory = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(createCategory);
  }

  async findCategoryByName(categoryName: string) {
    const category = await this.categoryRepository.findOne({
      where: { name: categoryName }
    })

    if (!category) throw new NotFoundException(`Category ${categoryName} not found`);

    return category;
  }

  async findCategoryById(idCategory: number) {
    const category = await this.categoryRepository.findOne({
      where: { idCategory }
    })

    if (!category) throw new NotFoundException(`Category not found`);

    return category;
  }
}
  