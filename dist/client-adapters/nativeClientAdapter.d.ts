import { IClientAdapter, ReadyState } from './clientAdapterInterface';
export declare class NativeClientAdapter implements IClientAdapter {
    private client;
    constructor(url: string, protocol: string);
    readonly readyState: ReadyState;
    close(): void;
    send(serializedMessage: string): void;
    onopen: Function;
    onclose: Function;
    onerror: Function;
    onmessage: Function;
}
