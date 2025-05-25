import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { IUserRepository } from 'src/core/interfaces/user/repositories/user.repository'
import { User } from 'src/core/entities/user.entity'
import { UserModel } from '../models/user.model'
import { UserNotFoundError } from 'src/application/auth/errors/user-not-found.error'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserModel) private readonly userData: typeof UserModel,
  ) {}

  async create(user: User): Promise<void> {
    const userModelData = {
      id: user.id,
      login: user.login,
      email: user.email,
      passwordHashed: user.passwordHashed,
    }

    await this.userData.create(userModelData)
  }

  async read(email: string): Promise<User> {
    const userModel = await this.userData.findOne({ where: { email } })

    if (!userModel) {
      throw new UserNotFoundError()
    }

    return new User(userModel.toJSON())
  }

  async delete(id: string): Promise<void> {
    await this.userData.destroy({ where: { id } })
  }
}
