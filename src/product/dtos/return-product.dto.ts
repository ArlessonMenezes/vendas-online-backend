import { Product } from "../model/product.entity";

export class ReturnProductDto {
  idProduct: number;
  name: string;
  price: number;
  image: string;

  constructor(product: Product) {
    this.idProduct = product.idProduct;
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;
  }
}