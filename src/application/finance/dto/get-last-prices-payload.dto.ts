import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  Min,
  Max,
} from 'class-validator'

export class GetLastPricesPayloadDto {
  @IsString()
  @IsNotEmpty()
  figi: string

  @Min(10)
  @Max(100)
  @IsInt()
  @IsPositive()
  minCount: number
}
