import { cyan, bold } from 'cli-color';
import { stdout } from 'process';

(async () => {
  const { server } = await import('./server/index');
  const { url } = await import('./config/url');

  const { protocol, hostname, port } = url;

  const msg = (() =>
    `${cyan(bold('start'))} => 🚀 Running at ${protocol}${hostname}:${port}`)();

  server.listen(port, () => {
    stdout.write(`${msg}\n`);
  });
})();
