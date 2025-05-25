import { AppError } from 'src/core/app-error'

export class UserNotFoundError extends AppError {
  readonly statusCode = 404

  constructor() {
    super('User not found')
  }
}
