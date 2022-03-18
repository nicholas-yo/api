export const Headers = (header?: Record<string, string>) => {
  const defaultHeader = {
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age=3600, must-revalidate'
  };

  return header ? { ...defaultHeader, ...header } : defaultHeader;
};
