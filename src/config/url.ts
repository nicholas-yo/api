type Url = {
  protocol: string;
  hostname: string;
  port: number;
};

export const url = ((): Url => {
  return {
    protocol: 'http://',
    hostname: 'localhost',
    port: 3000
  };
})();
