import type { Response } from 'http';

export default (() => {
  const Headers = (header?: Record<string, string>) => {
    const defautHeader = {
      'Content-Type': 'application/json'
    };

    if (header) {
      return { ...defautHeader, ...header };
    }

    return defautHeader;
  };

  function send(res: Response, chunk: unknown) {
    return res.end(chunk);
  }

  function json(res: Response, chunk: unknown) {
    return res.end(JSON.stringify(chunk));
  }

  return {
    Headers,
    send,
    json
  };
})();
