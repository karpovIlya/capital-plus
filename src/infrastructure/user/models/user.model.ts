import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript'
import { IUser } from 'src/core/interfaces/user/user.interface'

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, IUser> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  declare id: string

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
  })
  declare login: string

  @Column({
    type: DataType.STRING(128),
    unique: true,
    allowNull: false,
  })
  declare email: string

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  declare passwordHashed: string
}
