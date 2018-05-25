import { WSAdapter } from '../ws';
import { SocketIOAdapter } from '../socketIO';

export const Store: any = {
  ws: WSAdapter,
  io: SocketIOAdapter,
};
