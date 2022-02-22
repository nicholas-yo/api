import type { Response } from 'http';

export const response = (() => {
  function send(res: Response, chunk: unknown) {
    return res.end(chunk);
  }

  function json(res: Response, chunk: unknown) {
    return res.end(JSON.stringify(chunk));
  }

  return {
    send,
    json
  };
})();
