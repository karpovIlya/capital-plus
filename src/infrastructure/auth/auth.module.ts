import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from '../user/user.module'

import { AuthController } from 'src/presentation/controllers/auth.controller'

import { RegisterCommand } from 'src/application/auth/register.command'
import { LoginCommand } from 'src/application/auth/login.command'

import { ITokenService } from 'src/core/interfaces/auth/token-service.interface'
import { TokenService } from './services/token.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    RegisterCommand,
    LoginCommand,
    { provide: ITokenService, useClass: TokenService },
  ],
})
export class AuthModule {}
