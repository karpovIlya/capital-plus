import { IAsset } from '../interfaces/finance/asset.interface'
import { SMA, EMA } from 'technicalindicators'

export class Asset implements IAsset {
  public readonly id: string
  public readonly figi: string
  public readonly name: string
  public readonly company: string

  constructor(asset: IAsset) {
    this.id = asset.id
    this.figi = asset.figi
    this.name = asset.name
    this.company = asset.company
  }
}

export class AssetWithIndicators extends Asset {
  private sma: number[]
  private ema: number[]

  constructor(asset: IAsset) {
    super(asset)

    this.sma = []
    this.ema = []
  }

  public getSMA() {
    return this.sma
  }

  public getEMA() {
    return this.ema
  }

  public setSMAIndicator(prices: number[], window: number) {
    this.sma = SMA.calculate({
      period: window,
      values: prices,
    })

    return this
  }

  public setEMAIndicator(prices: number[], window: number) {
    this.ema = EMA.calculate({
      period: window,
      values: prices,
    })

    return this
  }
}
