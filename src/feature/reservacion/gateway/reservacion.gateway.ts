import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(
  {
    cors: {
      origin: '*',
    }
  }
)
export class ReservacionGateway {

  @WebSocketServer()
  server: Server;

  notificarReservacion(reservacion: any) {
    this.server.emit('newReservacion', reservacion)
  }
}
