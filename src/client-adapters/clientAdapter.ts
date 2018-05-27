declare let window: any;
const _global =
  typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
      ? window
      : {};
const NativeWebSocket = _global.WebSocket || _global.MozWebSocket;

// export interface IClientAdapter {
//   CONNECTING: number;
//   readyState: number;
//   close(): void;
//   send(data: string): void;
//   onopen(event: any): void;
//   onclose(event: any): void;
//   onerror(event: any): void;
//   onmessage(message: any): void;
// }

export enum ReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export class ClientAdapter {
  private client: any;

  constructor(url: string, protocol: string) {
    this.client = new NativeWebSocket(url, protocol);
  }

  public get readyState() {
    switch (this.client.readyState) {
      case 0:
        return ReadyState.CONNECTING;
      case 1:
        return ReadyState.OPEN;
      case 2:
        return ReadyState.CLOSING;
      default:
        return ReadyState.CLOSED;
    }
  }

  public close() {
    this.client.close();
  }

  public send(serializedMessage: string) {
    this.client.send(serializedMessage);
  }

  public get onopen() {
    return this.client.onpen;
  }

  public set onopen(onopen: Function) {
    this.client.onopen = onopen;
  }

  public get onclose() {
    return this.client.onclose;
  }

  public set onclose(onclose: Function) {
    this.client.onclose = onclose;
  }

  public get onerror() {
    return this.client.onerror;
  }

  public set onerror(onerror: Function) {
    this.client.onerror = onerror;
  }

  public get onmessage() {
    return this.client.onmessage;
  }

  public set onmessage(onmessage: Function) {
    this.client.onmessage = onmessage;
  }
}
