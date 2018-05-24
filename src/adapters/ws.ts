import * as WebSocket from 'ws';
import { IncomingMessage } from 'http';

import { Adapter, ConnectionHandler } from './adapterInterface';

export class WebsocketAdapter implements Adapter {
  private wsServer: WebSocket.Server;

  constructor(options?: any) {
    this.wsServer = new WebSocket.Server(options || {});
  }

  on(event: string, connectionHandler: ConnectionHandler) {
    this.wsServer.on(event, connectionHandler);
  }

  removeListener(event: string, connectionHandler: ConnectionHandler) {
    this.wsServer.removeListener(event, connectionHandler);
  }

  close() {
    this.wsServer.close();
  }
}
