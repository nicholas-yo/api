import type { Request } from 'http';
import { yellow } from 'cli-color';
import { Buffer } from 'buffer';

type RequestFunctionReturnType = {
  body: (req: Request) => Promise<unknown>;
  cookies: (req: Request) => string | Record<string, string>;
};

export const request = ((): RequestFunctionReturnType => {
  async function body(req: Request): Promise<string> {
    const buffers: Array<Buffer> = (() => [])();

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    return Buffer.concat(buffers).toString();
  }

  function cookies(req: Request): string | Record<string, string> {
    const [key, value] = req.headers.cookie?.split('=') as string[];

    return !req.headers.cookie
      ? yellow('No have cookies')
      : {
          [key]: value
        };
  }

  return {
    body,
    cookies
  };
})();
