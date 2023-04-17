import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';

import { InsertProductInCartDto } from './dtos/insert-product-in-cart.dto';
import { Cart } from './model/cart.entity';

const LINE_EFFETCTED = 1;

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly cartProductService: CartProductService,
  ){}

  async clearCart(idUser: number) {
    const cart = await this.findCartByIdUser(idUser, true);

    await this.cartRepository.save({
      ...cart,
      active: false,
    })

    return {
      raw: [],
      affected: LINE_EFFETCTED,
    }
  }

  async findCartByIdUser(idUser: number, isRelations?: boolean) {
    const cart = await this.cartRepository.findOne({
      where: {
        idUser,
        active: true,
      },
      relations: isRelations? {
        cartProducts: {
          product: true,
        },
      } : undefined
    });

    if (!cart)
      throw new NotFoundException('Cart active not found');

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
    const cart = await this.findCartByIdUser(idUser)
    .catch(async () => {
      return this.createCart(idUser);
    });

    await this.cartProductService.inserProductInCart(
      insertProductInCartDto,
      cart
    );

    return cart;
  }
}
