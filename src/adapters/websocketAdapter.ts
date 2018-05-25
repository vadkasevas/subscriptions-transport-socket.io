import { DynamicClass } from './classLoader/dynamicClass';
import { AdapterInterface, ConnectionHandler } from './adapterInterface';

export class WebsocketAdapter implements AdapterInterface {
  private wsServer: AdapterInterface;

  constructor(websocketLibrary: string, options?: any) {
    this.wsServer = new DynamicClass(
      websocketLibrary,
      options,
    ) as AdapterInterface;
  }

  public on(event: string, connectionHandler: ConnectionHandler) {
    this.wsServer.on(event, connectionHandler);
  }

  public removeListener(event: string, connectionHandler: ConnectionHandler) {
    this.wsServer.removeListener(event, connectionHandler);
  }

  public close() {
    this.wsServer.close();
  }
}
