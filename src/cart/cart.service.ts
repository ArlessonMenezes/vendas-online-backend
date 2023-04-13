import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';

import { InsertProductInCartDto } from './dtos/insert-product-in-cart.dto';
import { Cart } from './model/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductService,
    private readonly cartProductService: CartProductService,
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
    insertProductInCartDto: InsertProductInCartDto,
    idUser: number,
  ) {
    const cart = await this.verifyActiveCart(idUser)
    .catch(async () => {
      return this.createCart(idUser);
    });

    const product = await this.productService.findProductById(
      insertProductInCartDto.idProduct
    );

    await this.cartProductService.inserProductInCart(
      insertProductInCartDto,
      cart
    );

    return await this.cartRepository.save({
      idUser: cart.idUser,
      cartProducts: product.cartProducts
    });
  }
}
