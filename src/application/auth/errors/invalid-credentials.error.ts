import { AppError } from 'src/core/app-error'

export class InvalidCredentialsError extends AppError {
  readonly statusCode = 401

  constructor() {
    super('Invalid credentials')
  }
}
