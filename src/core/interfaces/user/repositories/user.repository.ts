import { User } from 'src/core/entities/user.entity'

export abstract class IUserRepository {
  abstract create(user: User): Promise<void>
  abstract read(email: string): Promise<User>
  abstract delete(id: string): Promise<void>
}
