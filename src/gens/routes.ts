import type { Request, Response } from 'http';
import { paths } from './paths';

type FunctionModuleReturn = (req: Request, res: Response) => void;

type Module = Record<string, FunctionModuleReturn>;

export const routes = (async () => {
  const routes = new Map<string, FunctionModuleReturn>();

  for await (const path of await paths) {
    const module: Module = await import(path);

    const routePath: string = path.substring(26).replace(/.js$/, '');
    const [moduleReturn] = Object.values(module);

    routes.set(routePath, moduleReturn);
  }

  return routes;
})();
