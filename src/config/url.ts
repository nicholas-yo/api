type Url = {
  protocol: string;
  hostname: string;
  port: number;
};

export default ((): Url => {
  return {
    protocol: 'http://',
    hostname: 'localhost',
    port: 3000
  };
})();
