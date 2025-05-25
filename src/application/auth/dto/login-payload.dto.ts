import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator'

export class LoginPayloadDto {
  @IsEmail()
  @MaxLength(256)
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  rawPassword: string
}
