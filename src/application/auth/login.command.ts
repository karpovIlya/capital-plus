import { Injectable } from '@nestjs/common'
import { LoginPayloadDto } from './dto/login-payload.dto'
import { IUserRepository } from 'src/core/interfaces/user/repositories/user.repository'
import { ITokenService } from 'src/core/interfaces/auth/token-service.interface'
import { UserNotFoundError } from './errors/user-not-found.error'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

@Injectable()
export class LoginCommand {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(dto: LoginPayloadDto) {
    const user = await this.userRepo.read(dto.email)

    if (!user) {
      throw new UserNotFoundError()
    }

    const isPasswordCorrect = await user.comparePassword(dto.rawPassword)

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError()
    }

    return {
      accessToken: await this.tokenService.generateToken({
        id: user.id,
        email: user.email,
      }),
    }
  }
}
