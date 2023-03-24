import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthorizationToLoginPayload } from "src/utils/base-64.converter";

export const IdUser = createParamDecorator(
  (_, ctx: ExecutionContext) => {

    const { authorization } = ctx.switchToHttp().getRequest().headers;

    const LoginPayload = AuthorizationToLoginPayload(authorization)

    return LoginPayload?.idUser;
  }
);