import { IsInt, IsPositive, IsUUID, Max, Min } from 'class-validator'

export class GetIndicatorsPayloadDto {
  @IsUUID('4')
  id: string

  @Min(30)
  @Max(60)
  @IsInt()
  @IsPositive()
  minCount: number

  @Min(10)
  @Max(30)
  @IsInt()
  @IsPositive()
  window: number
}
