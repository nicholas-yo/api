import type { Request } from 'http';
import { yellow } from 'cli-color';
import { Buffer } from 'buffer';

type RequestFunctionReturnType = {
  body: (req: Request) => Promise<string>;
  cookies: (req: Request) => Promise<string | Record<string, string>>;
};

export const request = ((): RequestFunctionReturnType => {
  async function body(req: Request): Promise<string> {
    const buffers: Array<Buffer> = (() => [])();

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    return Buffer.concat(buffers).toString();
  }

  async function cookies(req: Request): Promise<string | Record<string, string>> {
    if (!req.headers.cookie) return yellow('No have cookies');

    const [key, value] = req.headers.cookie?.split('=') as string[];

    return {
      [key]: value
    };
  }

  return {
    body,
    cookies
  };
})();
