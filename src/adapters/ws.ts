import * as WebSocket from 'ws';
import { IncomingMessage } from 'http';

import {
  AdapterInterface,
  ConnectionHandler,
  SocketAdapterInterface,
  State,
} from './adapterInterface';

class SocketAdapter implements SocketAdapterInterface {
  private _socket: WebSocket;

  constructor(socket: WebSocket) {
    this._socket = socket;
  }

  public get protocol() {
    return this._socket.protocol;
  }

  public get state() {
    switch (this._socket.readyState) {
      case WebSocket.OPEN:
        return State.OPEN;
      case WebSocket.CONNECTING:
        return State.CONNECTING;
      case WebSocket.CLOSING:
        return State.CLOSING;
      default:
        return State.CLOSED;
    }
  }

  public on(event: string, connectionHandler: ConnectionHandler) {
    this._socket.on(event, connectionHandler);
  }

  public send(data: any, cb?: (err: Error) => void) {
    this._socket.send(data, cb);
  }

  public emit(event: string | symbol, ...args: any[]) {
    return this._socket.emit(event, ...args);
  }

  public close(code?: number, data?: string) {
    this._socket.close(code, data);
  }
}

export class WebsocketAdapter implements AdapterInterface {
  private wsServer: WebSocket.Server;

  constructor(options?: any) {
    this.wsServer = new WebSocket.Server(options || {});
  }

  public on(event: string, connectionHandler: ConnectionHandler) {
    this.wsServer.on(event, (socket: WebSocket, request: IncomingMessage) => {
      const socketAdapter = new SocketAdapter(socket);
      connectionHandler(socketAdapter, request);
    });
  }

  public removeListener(event: string, connectionHandler: ConnectionHandler) {
    this.wsServer.removeListener(event, connectionHandler);
  }

  public close() {
    this.wsServer.close();
  }
}
