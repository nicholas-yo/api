import process from 'process';

(async () => {
  const { default: server } = await import('./server/index');
  const { default: url } = await import('./config/url');

  const { hostname, port, protocol } = url;

  (await server).listen(port, () => {
    console.log(`Running at ${protocol}${hostname}:${port}`);
  });

  process.on('exit', async () => (await server).close());
})();
