import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decoratos/roles.decoratos';
import { IdUser } from 'src/decoratos/user-id.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

import { CartService } from './cart.service';
import { InsertProductInCartDto } from './dtos/insert-product-in-cart.dto';
import { ReturnCartDto } from './dtos/return-cart.dto';

@Roles(UserTypeEnum.User, UserTypeEnum.Admin)
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ){}

  @UsePipes(ValidationPipe)
  @Post()
  async createCart(
    @IdUser() idUser: number,
    @Body() insertProductInCartDto: InsertProductInCartDto,
  ){
    return new ReturnCartDto(
      await this.cartService.insertProductInCart(
        insertProductInCartDto,
        idUser,
      ),
    );
  };

  @UsePipes(ValidationPipe)
  @Get()
  async findCartByidUser(@IdUser() idUser: number) {
    return new ReturnCartDto(
      await this.cartService.findCartByIdUser(idUser, true),
    );
  };

  @Delete()
  async clearCart(@IdUser() idUser: number) {
    return this.cartService.clearCart(idUser);
  }
}
