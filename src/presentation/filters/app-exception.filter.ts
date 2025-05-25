import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { AppError } from 'src/core/app-error'

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    if (exception instanceof AppError) {
      return response.status(exception.statusCode).json({
        message: exception.message,
        error: exception.constructor.name,
      })
    }

    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse())
    }

    return response.status(500).json({ message: 'Internal Server Error' })
  }
}
