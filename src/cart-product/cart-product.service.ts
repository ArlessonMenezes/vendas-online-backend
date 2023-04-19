import { Injectable } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertProductInCartDto } from 'src/cart/dtos/insert-product-in-cart.dto';
import { UpdateProductInCart } from 'src/cart/dtos/update-product-in-cart.dto';
import { Cart } from 'src/cart/model/cart.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';

import { CartProduct } from './model/cart-product.entity';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
    private readonly productService: ProductService,
  ){}

  async verifyProductInCart(
    idProduct: number,
    idCart: number,  
  ) {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        idProduct,
        idCart,
      }
    })

    if (!cartProduct) throw new NotAcceptableException(
      'Product not found'
    );

    return cartProduct;
  };

  async createProductInCart(
    insertProductCartDto: InsertProductInCartDto,
    idCart: number,
  ) {
  
    return this.cartProductRepository.save({
      ...insertProductCartDto,
      idCart,
    })
  }

  async inserProductInCart(
    insertProductInCartDto: InsertProductInCartDto,
    cart: Cart
  ) {

    await this.productService.findProductById(
      insertProductInCartDto.idProduct
    );

    const cartProduct = await this.verifyProductInCart(
      insertProductInCartDto.idProduct,
      cart.idCart
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createProductInCart(insertProductInCartDto, cart.idCart);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + insertProductInCartDto.amount
    });
  }

  async deleteProductInCart(idProduct: number, idCart: number) {
    await this.productService.findProductById(idProduct);

    return this.cartProductRepository.delete({
      idProduct,
      idCart,
    });
  };

  async updateProductInCart(
    cart: Cart,
    updateProductInCartDto: UpdateProductInCart,
  ) {
    await this.productService.findProductById(
      updateProductInCartDto.idProduct
    );

    const cartProduct = await this.verifyProductInCart(
      updateProductInCartDto.idProduct,
      cart.idCart,
    );
    
    return this.cartProductRepository.save({
      ...cartProduct,
      amount: updateProductInCartDto.amount,
    })
  }
};
