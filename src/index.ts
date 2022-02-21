import { cyanBright } from 'cli-color';
import process from 'process';

(async () => {
  const { createWriteStream } = await import('fs');
  const { Console } = await import('console');
  const { join } = await import('path');

  const { default: server } = await import('./server/index');
  const {
    default: { hostname, port, protocol }
  } = await import('./config/url');

  const output = createWriteStream(join(__dirname, '../src/logs/stdout.log'));
  const errorOutput = createWriteStream(
    join(__dirname, '../src/logs/stderr.log')
  );

  const logger = new Console({
    stdout: output,
    stderr: errorOutput
  });

  const msg = `[${process.pid}] - 🚀 Running at ${protocol}${hostname}:${port}`;

  logger.log(msg);

  server.listen(port, () => {
    const init = (msg: string) => cyanBright(msg);

    process.stdout.write(init(`${msg}\n`));
  });
})();
