import type { Request } from 'http';
import { yellow } from 'cli-color';

export const request = (() => {
  async function body(req: Request) {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    return JSON.parse(Buffer.concat(buffers).toString());
  }

  function cookies(req: Request) {
    if (!req.headers.cookie) {
      return yellow('No have cookies');
    }

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
