import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { UserModel } from './models/user.model'

import { UserController } from 'src/presentation/controllers/user.controller'

import { UserCreateCommand } from 'src/application/user/user-create.command'
import { UserDeleteCommand } from 'src/application/user/user-delete.command'
import { UserGetCommand } from 'src/application/user/user-get.command'

import { IUserRepository } from 'src/core/interfaces/user/repositories/user.repository'
import { UserRepository } from './repositories/user.repository'

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    UserCreateCommand,
    UserDeleteCommand,
    UserGetCommand,
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [UserCreateCommand, IUserRepository],
})
export class UserModule {}
