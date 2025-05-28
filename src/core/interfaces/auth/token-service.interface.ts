import { IJwtPayload } from './jwt-payload.interface'

export abstract class ITokenService {
  abstract generateToken(jwtPayload: IJwtPayload): Promise<string>
  abstract verifyToken(token: string): Promise<IJwtPayload>
}
