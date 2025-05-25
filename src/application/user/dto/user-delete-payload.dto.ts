import { IsUUID } from 'class-validator'

export class UserDeletePayloadDto {
  @IsUUID('4')
  id: string
}
