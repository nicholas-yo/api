import { red, magenta } from 'cli-color';

(async () => {
  const { server } = await import('./server/index');
  const { url } = await import('./config/url');

  const { protocol, hostname, port } = url;

  const writeErrMsg = (message: string) =>
    process.stdout.write(`${red('error')} - ${message}\n`);

  server.on('error', ({ message }) => writeErrMsg(message));

  server.on('clientError', ({ message }) => writeErrMsg(message));

  server.listen(port, () =>
    process.stdout.write(
      `${`${magenta(
        'start'
      )} - 🚀 Running at ${protocol}${hostname}:${port}\n`}`
    )
  );
})();
