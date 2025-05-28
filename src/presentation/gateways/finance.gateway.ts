import { Logger } from '@nestjs/common'
import {
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

import { ITokenService } from 'src/core/interfaces/auth/token-service.interface'
import { GetIndicatorsCommand } from '../../application/finance/get-indicators.command'
import { GetIndicatorsPayloadDto } from '../../application/finance/dto/get-indicators-payload.dto'

@WebSocketGateway({ namespace: 'finance' })
export class FinanceGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server
  private readonly logger = new Logger(FinanceGateway.name)
  private readonly socketToRoom = new Map<string, string>()
  private readonly roomSockets = new Map<string, Set<string>>()
  private readonly messageSendingIntervals = new Map<string, NodeJS.Timeout>()

  constructor(
    private readonly tokenService: ITokenService,
    private readonly getIndicatorCmd: GetIndicatorsCommand,
  ) {}

  afterInit() {
    this.logger.log('🚀 WebSocket server initialized')
  }

  async handleConnection(client: Socket) {
    try {
      this.logger.log(`⌛ Client: ${client.id} trying connected...`)

      const authHeader = client.handshake.headers.authorization

      if (!authHeader) {
        this.logger.warn(
          `⚠️ Client ${client.id} tried to connect without auth header`,
        )
        client.disconnect()
        return
      }

      const { id: userId } = await this.tokenService.verifyToken(authHeader)
      const room = `user-${userId}`

      this.socketToRoom.set(client.id, room)

      if (!this.roomSockets.has(room)) {
        this.roomSockets.set(room, new Set<string>())
      }

      this.roomSockets.get(room)!.add(client.id)
      this.logger.log(`✅ Client connected: ${client.id}`)

      client.join(room)
    } catch (error) {
      this.logger.error(
        `❌ Error during connection for client ${client.id}: ${error.message}`,
      )
      client.disconnect()
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`❌ Client disconnected: ${client.id}`)

    const disconnectRoom = this.socketToRoom.get(client.id)

    if (!disconnectRoom) return

    const allRoomSockets = this.roomSockets.get(disconnectRoom)
    this.socketToRoom.delete(client.id)

    if (allRoomSockets) {
      allRoomSockets.delete(client.id)

      if (allRoomSockets.size == 0) {
        this.stopSendingMessages(client)
        this.roomSockets.delete(disconnectRoom)
      }
    }
  }

  @SubscribeMessage('subscribe-asset')
  handleAssetSubscription(
    @MessageBody() dto: GetIndicatorsPayloadDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.startSendingMessages(dto, client)
  }

  @SubscribeMessage('unsubscribe-asset')
  handleAssetUnsubscription(@ConnectedSocket() client: Socket) {
    this.stopSendingMessages(client)
  }

  startSendingMessages(dto: GetIndicatorsPayloadDto, client: Socket) {
    const currentRoom = this.socketToRoom.get(client.id)

    if (currentRoom && !this.messageSendingIntervals.has(currentRoom)) {
      this.logger.log('✅ Start sending emits...')

      const eventName = 'watch_asset'
      const timeoutInMs = 1000 * 10

      const interval = setInterval(() => {
        void (async () => {
          this.logger.log('💌 Sending emit...')
          this.server
            .to(currentRoom)
            .emit(eventName, await this.getIndicatorCmd.execute(dto))
        })()
      }, timeoutInMs)

      this.messageSendingIntervals.set(currentRoom, interval)
    }
  }

  stopSendingMessages(client: Socket) {
    const currentRoom = this.socketToRoom.get(client.id)

    if (!currentRoom) return

    clearInterval(this.messageSendingIntervals.get(currentRoom))

    this.messageSendingIntervals.delete(currentRoom)
    this.logger.log(`🛑 Stopped sending messages ${currentRoom}`)
  }
}
