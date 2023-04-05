import { Controller } from '@nestjs/common';
import { Roles } from 'src/decoratos/roles.decoratos';
import { UserTypeEnum } from 'src/user/enum/user-type.enum';

@Roles(UserTypeEnum.User)
@Controller('cart')
export class CartController {}
