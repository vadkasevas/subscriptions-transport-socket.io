import * as io from 'socket.io';
import { IncomingMessage } from 'http';

import {
  AdapterInterface,
  ConnectionHandler,
  SocketAdapterInterface,
  State,
} from './adapterInterface';

class SocketAdapter implements SocketAdapterInterface {
  private _socket: io.Socket;

  constructor(socket: io.Socket) {
    this._socket = socket;
  }

  public get protocol() {
    return undefined as string;
  }

  public get state() {
    if (this._socket.connected) {
      return State.OPEN;
    }

    return State.CLOSED;
  }

  public removeListener(event: string, connectionHandler: ConnectionHandler) {
    this._socket.removeListener(event, connectionHandler);
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
    this._socket.disconnect(true);
  }
}

export class SocketIOAdapter implements AdapterInterface {
  private io: SocketIO.Server;
  private socket: SocketAdapter;

  constructor(options?: any) {
    const { server } = options;
    this.io = io(server);
  }

  public on(event: string, connectionHandler: ConnectionHandler) {
    this.io.on(event, (socket: io.Socket, request: IncomingMessage) => {
      this.socket = new SocketAdapter(socket);
      connectionHandler(this.socket, request);
    });
  }

  public removeListener(event: string, connectionHandler: ConnectionHandler) {
    this.socket.removeListener(event, connectionHandler);
  }

  public close() {
    this.io.close();
  }
}
