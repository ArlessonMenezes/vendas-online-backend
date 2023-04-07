import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dtos/create-cart.dto';

import { Cart } from './model/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductService,
  ){}

  async verifyActiveCart(idUser: number) {
    const cart = await this.cartRepository.findOne({
      where: { idUser }
    });

    if (!cart) throw new NotFoundException('Cart not found');

    return cart;
  }

  async createCart(idUser: number) {
    const cart = this.cartRepository.create({
      active: true,
      idUser,
    });

    return this.cartRepository.save(cart);
  }

  async insertProductInCart(
    createCartDto: CreateCartDto,
    idUser: number,
  ) {
    const cart = await this.verifyActiveCart(idUser)
    .catch(async () => {
      return this.createCart(idUser);
    });

    return cart;
  }
}
