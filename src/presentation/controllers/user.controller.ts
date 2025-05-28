import { Controller, Get, Delete, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../guards/auth.guard'
import { IJwtPayload } from 'src/core/interfaces/auth/jwt-payload.interface'

import { User } from '../decorators/user.decorator'
import { UserGetCommand } from 'src/application/user/user-get.command'
import { UserDeleteCommand } from 'src/application/user/user-delete.command'

@Controller('user')
export class UserController {
  constructor(
    private readonly userGetCmd: UserGetCommand,
    private readonly userDeleteCmd: UserDeleteCommand,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@User() user: IJwtPayload) {
    return await this.userGetCmd.execute({ email: user.email })
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@User() user: IJwtPayload) {
    return await this.userDeleteCmd.execute({ id: user.id })
  }
}
