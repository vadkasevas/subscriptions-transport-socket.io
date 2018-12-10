import { IServerAdapter, ConnectionHandler } from './serverAdapterInterface';
export declare class NativeServerAdapter implements IServerAdapter {
    private wsServer;
    constructor(options?: any);
    on(event: string, connectionHandler: ConnectionHandler): void;
    removeListener(event: string, connectionHandler: ConnectionHandler): void;
    close(): void;
}
