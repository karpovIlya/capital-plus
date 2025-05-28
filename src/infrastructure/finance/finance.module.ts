import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'

import { FinanceGateway } from 'src/presentation/gateways/finance.gateway'
import { GetAssetCommand } from 'src/application/finance/get-asset.command'
import { GetIndicatorsCommand } from 'src/application/finance/get-indicators.command'
import { GetLastPricesCommand } from 'src/application/finance/get-last-prices.command'

import { IAssetRepository } from 'src/core/interfaces/finance/repositories/asset.repository'
import { AssetRepository } from './repositories/asset.repository'

@Module({
  imports: [AuthModule],
  providers: [
    FinanceGateway,
    GetAssetCommand,
    GetIndicatorsCommand,
    GetLastPricesCommand,
    { provide: IAssetRepository, useClass: AssetRepository },
  ],
})
export class FinanceModule {}
