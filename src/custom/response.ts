import type { Response } from 'http';

type ResponseFunctionReturnType = {
  json: (res: Response, chunk: unknown) => Promise<Response>;
};

export const response = ((): ResponseFunctionReturnType => {
  async function json(res: Response, chunk: unknown) {
    return res.end(JSON.stringify(chunk));
  }

  return {
    json
  };
})();
