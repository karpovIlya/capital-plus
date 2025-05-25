import { IsEmail, MaxLength } from 'class-validator'

export class UserGetPayloadDto {
  @IsEmail()
  @MaxLength(256)
  email: string
}
