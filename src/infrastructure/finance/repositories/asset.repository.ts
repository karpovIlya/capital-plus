import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { TinkoffInvestApi, Helpers, CandlesLoader } from 'tinkoff-invest-api'
import {
  CandleInterval,
  HistoricCandle,
} from 'tinkoff-invest-api/cjs/generated/marketdata'

import { Asset } from 'src/core/entities/asset.entity'
import { IAssetRepository } from 'src/core/interfaces/finance/repositories/asset.repository'

@Injectable()
export class AssetRepository implements IAssetRepository {
  private readonly tinkoffApi: TinkoffInvestApi

  constructor(private readonly configService: ConfigService) {
    this.tinkoffApi = new TinkoffInvestApi({
      token: this.configService.get<string>('T_INVEST_TOKEN') || '',
    })
  }

  async getAsset(id: string): Promise<Asset> {
    const { asset } = await this.tinkoffApi.instruments.getAssetBy({ id })
    return new Asset({
      id: asset?.uid || '',
      figi: asset?.instruments[0]?.figi || '',
      name: asset?.name || '',
      company: asset?.brand?.company || '',
    })
  }

  async getLastPrices(figi: string, minCount: number): Promise<number[]> {
    const candlesLoader = new CandlesLoader(this.tinkoffApi)
    const { candles } = await candlesLoader.getCandles({
      interval: CandleInterval.CANDLE_INTERVAL_1_MIN,
      figi,
      minCount,
    })
    return candles
      .slice(-minCount)
      .map((candle: HistoricCandle) => Helpers.toNumber(candle.close) || 0)
  }
}
