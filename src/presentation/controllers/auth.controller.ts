import { Controller, Post, Body } from '@nestjs/common'
import { RegisterCommand } from 'src/application/auth/register.command'
import { LoginCommand } from 'src/application/auth/login.command'
import { RegisterPayloadDto } from 'src/application/auth/dto/register-payload.dto'
import { LoginPayloadDto } from 'src/application/auth/dto/login-payload.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerCmd: RegisterCommand,
    private readonly loginCmd: LoginCommand,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterPayloadDto) {
    return await this.registerCmd.execute(dto)
  }

  @Post('login')
  async login(@Body() dto: LoginPayloadDto) {
    return await this.loginCmd.execute(dto)
  }
}
