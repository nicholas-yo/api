import type { Request } from 'http';

export default (() => {
  async function bodyParser(req: Request) {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    return JSON.parse(Buffer.concat(buffers).toString());
  }

  return {
    bodyParser
  };
})();
