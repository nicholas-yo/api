import { cyanBright } from 'cli-color';
import process from 'process';

(async () => {
  const { default: server } = await import('./server/index');
  const {
    default: { hostname, port, protocol }
  } = await import('./config/url');

  server.listen(port, () => {
    const init = (msg: string) => cyanBright(msg);

    console.log(
      init(`[${process.pid}] - 🚀 Running at ${protocol}${hostname}:${port}`)
    );
  });

  process.on('exit', () => server.close());
})();
