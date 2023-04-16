import { ReturnCartProductDto } from "src/cart-product/dtos/return-cart-product.dto";
import { CartProduct } from "src/cart-product/model/cart-product.entity";
import { Cart } from "../model/cart.entity";

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