import { Asset } from 'src/core/entities/asset.entity'

export abstract class IAssetRepository {
  abstract getAsset(id: string): Promise<Asset>
  abstract getLastPrices(figi: string, minCount: number): Promise<number[]>
}
