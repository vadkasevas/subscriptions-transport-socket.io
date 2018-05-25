import { IncomingMessage } from 'http';

export enum State {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
}

export type ConnectionHandler = (
  socket: SocketAdapterInterface,
  request: IncomingMessage,
) => void;

export type SocketAdapterInterface = {
  protocol: string;
  state: State;
  close(code?: number, data?: string): void;
  on(event: string, connectionHandler: ConnectionHandler): void;
  emit(event: string | symbol, ...args: any[]): boolean;
  send(data: any, cb?: (err: Error) => void): void;
};

export type AdapterInterface = {
  on(event: string, connectionHandler: ConnectionHandler): void;

  removeListener(event: string, connectionHandler: ConnectionHandler): void;

  close(): void;
};
