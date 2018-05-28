import * as io from 'socket.io-client';
import { IClientAdapter, ReadyState } from './clientAdapterInterface';

export class SocketIOClientAdapter implements IClientAdapter {
  private socket: SocketIOClient.Socket;
  private _onmessage: Function;

  constructor(url: string, protocol: string) {
    this.socket = io(url, {
      transports: ['websocket'],
      forceNew: true,
      query: {
        protocol: protocol,
      },
    });
  }

  public get readyState() {
    switch (this.socket.io.readyState) {
      case 'opening':
        return ReadyState.CONNECTING;
      case 'open':
        return ReadyState.OPEN;
      case 'closing':
        return ReadyState.CLOSING;
      default:
        return ReadyState.CLOSED;
    }
  }

  public close() {
    this.socket.close();
  }

  public send(serializedMessage: string) {
    this.socket.send(serializedMessage);
  }

  public set onopen(onopen: Function) {
    this.socket.on('connect', onopen);
  }

  public set onclose(onclose: Function) {
    this.socket.on('disconnect', onclose);
  }

  public set onerror(onerror: Function) {
    this.socket.on('error', onerror);
  }

  public get onmessage() {
    return this._onmessage;
  }

  public set onmessage(onmessage: Function) {
    this.socket.removeListener('message');
    this._onmessage = onmessage;
    this.socket.on('message', this._onmessage);
  }
}
