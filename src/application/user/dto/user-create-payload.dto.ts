import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator'

export class UserCreatePayloadDto {
  @IsString()
  @MinLength(6)
  @MaxLength(128)
  login: string

  @IsEmail()
  @MaxLength(256)
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  rawPassword: string
}
