export default (async () => {
  function parseCookies(cookies: string) {
    if (!cookies) {
      return 'No have cookies';
    }

    const [key, value] = cookies.split('=') as string[];

    return {
      [key]: value
    };
  }

  return {
    parseCookies
  };
})();
