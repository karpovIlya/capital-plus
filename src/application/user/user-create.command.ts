import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { User } from 'src/core/entities/user.entity'
import { UserCreatePayloadDto } from './dto/user-create-payload.dto'
import { IUserRepository } from 'src/core/interfaces/user/repositories/user.repository'

@Injectable()
export class UserCreateCommand {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(dto: UserCreatePayloadDto): Promise<void> {
    const user = await new User({
      id: uuid(),
      login: dto.login,
      email: dto.email,
      passwordHashed: '',
    }).setPasswordHashed(dto.rawPassword)

    await this.userRepo.create(user)
  }
}
