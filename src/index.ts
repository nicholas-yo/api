import { stdout, platform, pid } from 'process';
import { cyanBright } from 'cli-color';

(async () => {
  const { server } = await import('./server/index');
  const { url } = await import('./config/url');

  const { protocol, hostname, port } = url;

  const msg = (() =>
    `[${pid}] - 🚀 Running on ${platform.toUpperCase()} at ${protocol}${hostname}:${port}`)();

  server.on('error', err => console.error(err.message));

  server.listen(port, () => {
    const init = (msg: string) => cyanBright(msg);

    stdout.write(init(`${msg}\n`));
  });
})();
