import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './model/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ){}

  async findAll() {
    const products = await this.productRepository.find();

    if (!products || products.length === 0) 
      throw new NotFoundException('Products not found');

    return products
  }

  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });

    if (product) throw new BadRequestException('Product already exists');

    await this.categoryService.findCategoryById(
      createProductDto.idCategory
    );

    // if (!category) throw new BadRequestException('Category does not exists');

    const newProduct = this.productRepository.create({
      ...createProductDto,
      // idCategory: category.idCategory, 
    });
  
    return this.productRepository.save(newProduct);
  }
}