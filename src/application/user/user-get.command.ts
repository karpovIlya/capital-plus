import { Injectable } from '@nestjs/common'
import { User } from 'src/core/entities/user.entity'
import { UserGetPayloadDto } from './dto/user-get-payload.dto'
import { IUserRepository } from 'src/core/interfaces/user/repositories/user.repository'

@Injectable()
export class UserGetCommand {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(dto: UserGetPayloadDto): Promise<User> {
    return await this.userRepo.read(dto.email)
  }
}
