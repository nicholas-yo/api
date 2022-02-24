import type { Response } from 'http';

type ResponseFunctionReturnType = {
  json: (res: Response, chunk: unknown) => Response;
};

export const response = ((): ResponseFunctionReturnType => {
  function json(res: Response, chunk: unknown) {
    return res.end(JSON.stringify(chunk));
  }

  return {
    json
  };
})();
