import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IJwtPayload } from 'src/core/interfaces/auth/jwt-payload.interface'

interface IRequestWithUser extends Request {
  user: IJwtPayload
}

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<IRequestWithUser>()
    return req.user
  },
)
