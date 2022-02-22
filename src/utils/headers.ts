export const Headers = (header?: Record<string, string>) => {
  const defautHeader = {
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age=3600, must-revalidate'
  };

  if (header) {
    return { ...defautHeader, ...header };
  }

  return defautHeader;
};
