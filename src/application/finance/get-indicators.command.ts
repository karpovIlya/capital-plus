import { Injectable } from '@nestjs/common'

import { AssetWithIndicators } from 'src/core/entities/asset.entity'
import { GetAssetCommand } from './get-asset.command'
import { GetLastPricesCommand } from './get-last-prices.command'

import { GetIndicatorsPayloadDto } from './dto/get-indicators-payload.dto'

@Injectable()
export class GetIndicatorsCommand {
  constructor(
    private readonly getAssetCmd: GetAssetCommand,
    private readonly getLastPriceCmd: GetLastPricesCommand,
  ) {}

  async execute(dto: GetIndicatorsPayloadDto): Promise<AssetWithIndicators> {
    const asset = await this.getAssetCmd.execute({ id: dto.id })
    const lastPrices = await this.getLastPriceCmd.execute({
      figi: asset.figi,
      minCount: dto.minCount,
    })

    return new AssetWithIndicators(asset)
      .setSMAIndicator(lastPrices, dto.window)
      .setEMAIndicator(lastPrices, dto.window)
  }
}
