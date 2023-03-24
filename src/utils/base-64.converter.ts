import { LoginPayloadDto } from "src/auth/dtos/login-payload.dto"

export const AuthorizationToLoginPayload = (
  authorization: string
): LoginPayloadDto | undefined => {
  const authorizationSplitd = authorization.split('.');
  
  if (authorizationSplitd.length < 3 || !authorizationSplitd[1]) {
    return undefined;
  }

  return JSON.parse(Buffer.from(authorizationSplitd[1], 'base64').toString('ascii'));
}