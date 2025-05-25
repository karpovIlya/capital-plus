import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { InfrastructureModule } from './infrastructure/infrastructure.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    InfrastructureModule,
  ],
})
export class AppModule {}
