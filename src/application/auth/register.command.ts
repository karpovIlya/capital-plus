import { Injectable } from '@nestjs/common'
import { RegisterPayloadDto } from './dto/register-payload.dto'
import { UserCreateCommand } from '../user/user-create.command'

@Injectable()
export class RegisterCommand {
  constructor(private readonly createUserCmd: UserCreateCommand) {}

  async execute(dto: RegisterPayloadDto) {
    await this.createUserCmd.execute(dto)
  }
}
