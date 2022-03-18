import { lstat, readdir } from 'fs/promises';
import { join } from 'path';

export const paths = (async () => {
  const paths = new Set<string>();

  const listPaths = async (base: string) => {
    const folders = await readdir(base);

    for (const folder in folders) {
      const path = join(base, folders[folder]);
      const stat = await lstat(path);

      stat.isDirectory() ? await listPaths(path) : paths.add(path);
    }
  };

  await listPaths(join(__dirname, '../routes'));

  return paths;
})();
