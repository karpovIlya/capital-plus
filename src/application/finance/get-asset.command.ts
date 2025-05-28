import { Injectable } from '@nestjs/common'
import { Asset } from 'src/core/entities/asset.entity'
import { IAssetRepository } from 'src/core/interfaces/finance/repositories/asset.repository'
import { GetAssetPayloadDto } from './dto/get-asset-payload.dto'

@Injectable()
export class GetAssetCommand {
  constructor(private readonly assetRepo: IAssetRepository) {}

  async execute(dto: GetAssetPayloadDto): Promise<Asset> {
    return await this.assetRepo.getAsset(dto.id)
  }
}
