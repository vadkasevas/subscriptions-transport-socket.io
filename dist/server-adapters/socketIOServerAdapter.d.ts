import { IServerAdapter, ConnectionHandler } from './serverAdapterInterface';
export declare class SocketIOServerAdapter implements IServerAdapter {
    private io;
    private socket;
    constructor(options?: any);
    on(event: string, connectionHandler: ConnectionHandler): void;
    removeListener(event: string, connectionHandler: ConnectionHandler): void;
    close(): void;
}
