import { IncomingMessage } from 'http';

export type ConnectionHandler = (
  socket: Socket,
  request: IncomingMessage
) => void;

export type Socket = {
  protocol: string;

  close(code?: number, data?: string): void;

  on(event: string, connectionHandler: ConnectionHandler): void;

  readyState: number;

  send(data: any, cb?: (err: Error) => void): void;
};

export type Adapter = {
  on(event: string, connectionHandler: ConnectionHandler): void;

  removeListener(event: string, connectionHandler: ConnectionHandler): void;

  close(): void;
};
