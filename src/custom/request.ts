import type { Request } from 'http';
import { yellow } from 'cli-color';
import { Buffer } from 'buffer';

export const request = (() => {
  async function body(req: Request) {
    const buffers: Array<Uint8Array> = (() => [])();

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString('utf-8');

    return JSON.parse(data);
  }

  function cookies(req: Request) {
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
