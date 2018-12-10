/// <reference types="node" />
import { IncomingMessage } from 'http';
export declare enum State {
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3
}
export declare type ConnectionHandler = (socket: ISocketAdapter, request: IncomingMessage) => void;
export declare type ISocketAdapter = {
    protocol: string;
    state: State;
    close(code?: number, data?: string): void;
    on(event: string, connectionHandler: ConnectionHandler): void;
    emit(event: string | symbol, ...args: any[]): boolean;
    send(data: any, cb?: (err: Error) => void): void;
};
export declare type IServerAdapter = {
    on(event: string, connectionHandler: ConnectionHandler): void;
    removeListener(event: string, connectionHandler: ConnectionHandler): void;
    close(): void;
};
export interface IServerAdapterConstructor {
    new (options?: any): IServerAdapter;
}
