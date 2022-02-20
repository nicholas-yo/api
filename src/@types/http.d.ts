import 'http';

declare module 'http' {
  export interface Request extends IncomingMessage {
    query: Record<string, unknown>;
    body: Promise<any>;
  }

  export interface Response extends ServerResponse {
    json: (chunk: unknown) => Promise<Response>;
  }

  export type MethodsTypes =
    | 'ACL'
    | 'BIND'
    | 'CHECKOUT'
    | 'CONNECT'
    | 'COPY'
    | 'DELETE'
    | 'GET'
    | 'HEAD'
    | 'LINK'
    | 'LOCK'
    | 'M-SEARCH'
    | 'MERGE'
    | 'MKACTIVITY'
    | 'MKCALENDAR'
    | 'MKCOL'
    | 'MOVE'
    | 'NOTIFY'
    | 'OPTIONS'
    | 'PATCH'
    | 'POST'
    | 'PROPFIND'
    | 'PROPPATCH'
    | 'PURGE'
    | 'PUT'
    | 'REBIND'
    | 'REPORT'
    | 'SEARCH'
    | 'SOURCE'
    | 'SUBSCRIBE'
    | 'TRACE'
    | 'UNBIND'
    | 'UNLINK'
    | 'UNLOCK'
    | 'UNSUBSCRIBE';

  export type NewRequestListener = (req: Request, res: Response) => void;

  export function createServer(newRequestListener?: NewRequestListener): Server;
  export function createServer(
    options: ServerOptions,
    newRequestListener?: NewRequestListener
  ): Server;
}
