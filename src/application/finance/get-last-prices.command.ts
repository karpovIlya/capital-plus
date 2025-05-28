import { Injectable } from '@nestjs/common'
import { IAssetRepository } from 'src/core/interfaces/finance/repositories/asset.repository'
import { GetLastPricesPayloadDto } from './dto/get-last-prices-payload.dto'

@Injectable()
export class GetLastPricesCommand {
  constructor(private readonly assetRepo: IAssetRepository) {}

  async execute(dto: GetLastPricesPayloadDto) {
    return await this.assetRepo.getLastPrices(dto.figi, dto.minCount)
  }
}
