import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { FinanceModule } from './finance/finance.module'

import { JwtStrategy } from 'src/presentation/strategies/jwt.strategy'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('POSTGRES_HOST') || '',
        port: +configService.get('POSTGRES_PORT') || 5432,
        username: configService.get('POSTGRES_USER') || '',
        password: configService.get('POSTGRES_PASSWORD') || '',
        database: configService.get('POSTGRES_DB') || '',
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    PassportModule,
    UserModule,
    AuthModule,
    FinanceModule,
  ],
  providers: [JwtStrategy],
})
export class InfrastructureModule {}
