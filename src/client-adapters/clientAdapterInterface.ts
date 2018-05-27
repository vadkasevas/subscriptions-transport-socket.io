export enum ReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export interface IClientAdapter {
  readyState: ReadyState;
  close: Function;
  send: Function;
  onopen: any;
  onclose: any;
  onerror: any;
  onmessage: any;
}

export interface IClientAdaterConstructor {
  new (url: string, protocol: string): IClientAdapter;
}
