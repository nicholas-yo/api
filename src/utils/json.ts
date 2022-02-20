import type { Response } from 'http';

export default (async () => {
  async function json(res: Response, chunk: unknown) {
    return res.end(JSON.stringify(chunk));
  }

  return {
    json
  };
})();
