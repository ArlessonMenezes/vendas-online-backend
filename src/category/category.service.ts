import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
