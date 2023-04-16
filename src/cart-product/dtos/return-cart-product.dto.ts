import { ReturnCartDto } from "src/cart/dtos/return-cart.dto";
import { ReturnProductDto } from "src/product/dtos/return-product.dto";
import { CartProduct } from "../model/cart-product.entity";

export class ReturnCartProductDto {
  idCartProduct: number;
  idCart: number;
  idProduct: number;
  amount: number;
  product?: ReturnProductDto;
  cart?: ReturnCartDto;

  constructor(cartProduct: CartProduct) {
    this.idCartProduct = cartProduct.idCartProduct;
    this.idCart = cartProduct.idCart;
    this.idProduct = cartProduct.idProduct;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ReturnProductDto(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ?new ReturnCartDto(cartProduct.cart)
      : undefined;
  }
}