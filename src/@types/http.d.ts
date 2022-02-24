/* eslint-disable @typescript-eslint/no-explicit-any */
import 'http';

declare module 'http' {
  export interface Request extends IncomingMessage {
    query: Record<string, unknown>;
    body: any;
    cookies: () => Record<string, string>;
  }

  export interface Response extends ServerResponse {
    json: (chunk: unknown) => Response;
  }

  export type NewRequestListener = (req: Request, res: Response) => void;

  export function createServer(newRequestListener?: NewRequestListener): Server;
  export function createServer(
    options: ServerOptions,
    newRequestListener?: NewRequestListener
  ): Server;
}
