import { IncomingMessage } from 'http';

export enum State {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
}

export type ConnectionHandler = (
  socket: ISocketAdapter,
  request: IncomingMessage,
) => void;

export type ISocketAdapter = {
  protocol: string;
  state: State;
  close(code?: number, data?: string): void;
  on(event: string, connectionHandler: ConnectionHandler): void;
  emit(event: string | symbol, ...args: any[]): boolean;
  send(data: any, cb?: (err: Error) => void): void;
};

export type IServerAdapter = {
  on(event: string, connectionHandler: ConnectionHandler): void;

  removeListener(event: string, connectionHandler: ConnectionHandler): void;

  close(): void;
};

export interface IServerAdapterConstructor {
  new (options?: any): IServerAdapter;
}
