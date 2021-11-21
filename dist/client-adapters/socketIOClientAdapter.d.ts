import { IClientAdapter, ReadyState } from './clientAdapterInterface';
export declare class SocketIOClientAdapter implements IClientAdapter {
    private socket;
    private opts;
    private _onmessage;
    constructor(url: string, protocol: string, opts?: SocketIOClient.ConnectOpts);
    readonly readyState: ReadyState;
    close(): void;
    send(serializedMessage: string): void;
    onopen: Function;
    onclose: Function;
    onerror: Function;
    onmessage: Function;
}
