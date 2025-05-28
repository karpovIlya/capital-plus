import { IsUUID } from 'class-validator'

export class GetAssetPayloadDto {
  @IsUUID('4')
  id: string
}
