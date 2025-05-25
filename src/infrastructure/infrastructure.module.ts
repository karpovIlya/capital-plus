import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

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
    UserModule,
    AuthModule,
  ],
})
export class InfrastructureModule {}
