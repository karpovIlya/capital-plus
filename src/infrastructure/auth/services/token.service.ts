import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IJwtPayload } from 'src/core/interfaces/auth/jwt-payload.interface'

import { ITokenService } from 'src/core/interfaces/auth/token-service.interface'

@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(jwtPayload: IJwtPayload): Promise<string> {
    return this.jwtService.signAsync(jwtPayload)
  }
}
