import * as io from 'socket.io';

import {
  IServerAdapter,
  ConnectionHandler,
  ISocketAdapter,
  State,
} from './serverAdapterInterface';

class SocketAdapter implements ISocketAdapter {
  private _socket: io.Socket;

  constructor(socket: io.Socket) {
    this._socket = socket;
  }

  public get protocol() {
    const { protocol } = this._socket.handshake.query;
    return protocol;
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
    // Event close needs to be translated to disconnect for socket.io
    if (event === 'close') {
      event = 'disconnect';
    }
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

export class SocketIOServerAdapter implements IServerAdapter {
  private io: SocketIO.Server;
  private socket: SocketAdapter;

  constructor(options?: any) {
    const { ioInstance, server } = options;
    this.io = ioInstance || io(server);
  }

  public on(event: string, connectionHandler: ConnectionHandler) {
    this.io.on(event, (socket: io.Socket) => {
      const { request } = socket.client;
      this.socket = new SocketAdapter(socket);
      connectionHandler(this.socket, request);
    });
  }

  public removeListener(event: string, connectionHandler: ConnectionHandler) {
    this.socket.removeListener(event, connectionHandler);
  }

  public close() {
    this.socket.close();
  }
}
