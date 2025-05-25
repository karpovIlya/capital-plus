import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppExceptionFilter } from './presentation/filters/app-exception.filter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'

  app.setGlobalPrefix(globalPrefix)
  app.useGlobalFilters(new AppExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
