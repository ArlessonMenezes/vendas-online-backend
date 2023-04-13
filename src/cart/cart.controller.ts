import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decoratos/roles.decoratos';
import { IdUser } from 'src/decoratos/user-id.decorator';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

import { CartService } from './cart.service';
import { InsertProductInCartDto } from './dtos/insert-product-in-cart.dto';

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
    return this.cartService.insertProductInCart(
      insertProductInCartDto,
      idUser,
    );
  }
}
