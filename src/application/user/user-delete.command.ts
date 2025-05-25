import { Injectable } from '@nestjs/common'
import { UserDeletePayloadDto } from './dto/user-delete-payload.dto'
import { IUserRepository } from 'src/core/interfaces/user/repositories/user.repository'

@Injectable()
export class UserDeleteCommand {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(dto: UserDeletePayloadDto): Promise<void> {
    await this.userRepo.delete(dto.id)
  }
}
