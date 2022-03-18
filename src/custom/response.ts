import type { Response } from 'http';

export const response = (() => {
  function json(res: Response, chunk: unknown) {
    return res.end(JSON.stringify(chunk));
  }

  return {
    json
  };
})();
