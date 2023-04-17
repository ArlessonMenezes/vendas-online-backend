import { ReturnCartProductDto } from 'src/cart-product/dtos/return-cart-product.dto';

import { Cart } from '../model/cart.entity';

export class ReturnCartDto {
  idCart: number;
  cartProduct?: ReturnCartProductDto[];

  constructor(cart: Cart) {
    this.idCart = cart.idCart;
    this.cartProduct = cart.cartProducts
     ? cart.cartProducts.map(
        (cp) => new ReturnCartProductDto(cp)
      ) 
    : undefined;
  }
}