import { cyan, bold, red } from 'cli-color';
import { stdout } from 'process';

(async () => {
  const { server } = await import('./server/index');
  const { url } = await import('./config/url');

  const { protocol, hostname, port } = url;

  const msg = (() =>
    `${cyan(bold('start'))} => 🚀 Running at ${protocol}${hostname}:${port}`)();

  (await server).on('error', ({ message, name }) =>
    stdout.write(`${red(bold(name))} => ${message}\n`)
  );

  (await server).on('clientError', ({ message, name }) =>
    stdout.write(`${red(name)} => ${message}\n`)
  );

  (await server).listen(port, () => stdout.write(`${msg}\n`));
})();
