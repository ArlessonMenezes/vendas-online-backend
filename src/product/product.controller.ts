import { Controller, Get, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Param, Put, UsePipes } from '@nestjs/common/decorators';
import { Roles } from 'src/decoratos/roles.decoratos';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';
import { CreateProductDto } from './dtos/create-product.dto';
import { ReturnProductDto } from './dtos/return-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ){}

  @Get()
  async findAllProducts() {
    return (await this.productService.findAll()).map(
      product => new ReturnProductDto(product)
    );
  }

  @Roles(UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
  ){
    return this.productService.createProduct(createProduct);
  }

  @Roles(UserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Put('/update-product/:idProduct')
  async updateProduct(
    @Param('idProduct', ParseIntPipe) idProduct: number,
    @Body() updateProduct: UpdateProductDto,  
  ) {
    return this.productService.updateProduct(idProduct, updateProduct);
  }

  @Roles(UserTypeEnum.Admin)
  @UsePipes(ValidationPipe) 
  @Delete('/:idProduct')
  async deleteProduct(
    @Param('idProduct', ParseIntPipe) idProduct: number,
  ){
    return this.productService.deleteProduct(idProduct);
  }
}
