import type { Request, Response } from 'http';
import { paths } from './paths';

type Routes = Map<string, (req: Request, res: Response) => void>;

type Module = Record<string, (req: Request, res: Response) => void>;

export const routes: Promise<Routes> = (async () => {
  const routes: Promise<Routes> = (async () => new Map())();

  async function* importModule(path: string): AsyncGenerator<Module> {
    return yield await import(path);
  }

  for await (const path of await paths) {
    const module: Module = (await importModule(path).next()).value;

    const routePath: string = path.slice(26, path.length).replace(/.js$/, '');
    const [moduleReturn] = Object.values(module);

    (await routes).set(routePath, moduleReturn);
  }

  return await routes;
})();
