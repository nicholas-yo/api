import 'http';

declare module 'http' {
  export interface Request extends IncomingMessage {
    query: Record<string, unknown>;
    body: Promise<Record<string, unknown>>;
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