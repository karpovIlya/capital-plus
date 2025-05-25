import { compare, genSalt, hash } from 'bcryptjs'
import { IUser } from '../interfaces/user/user.interface'

export class User implements IUser {
  public readonly id: string
  public readonly login: string
  public readonly email: string

  private _passwordHashed: string

  constructor(user: IUser) {
    this.id = user.id
    this.login = user.login
    this.email = user.email
    this._passwordHashed = user.passwordHashed
  }

  public get passwordHashed() {
    return this._passwordHashed
  }

  public async setPasswordHashed(rawPassword: string) {
    const salt = await genSalt(10)
    this._passwordHashed = await hash(rawPassword, salt)

    return this
  }

  public async comparePassword(password: string) {
    return await compare(password, this._passwordHashed)
  }
}
