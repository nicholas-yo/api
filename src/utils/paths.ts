import { readdirSync, lstatSync, Stats } from 'fs';
import { join } from 'path';

const paths = (() => new Set<string>())();

const listFiles = (base: string): void => {
  const folders: string[] = readdirSync(base);

  for (const folder in folders) {
    const path: string = join(base, folders[folder]);
    const stat: Stats = lstatSync(path);

    stat.isDirectory() ? listFiles(path) : paths.add(path);
  }
};

listFiles(join(__dirname, '../routes'));

export { paths };
