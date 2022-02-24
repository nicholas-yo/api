import type { Request, Response } from 'http';
import { paths } from '@utils/paths';

type Router = Promise<Map<string, (req: Request, res: Response) => void>>;

export const router: Router = (async () => {
  const routes = (() =>
    new Map<string, (req: Request, res: Response) => void>())();

  for await (const path of paths) {
    const module = await import(path);
    const newPath = path.slice(26, path.length).replace(/.js$/, '');
    const [[, moduleReturn]] = Object.entries(module);

    routes.set(newPath, moduleReturn as (req: Request, res: Response) => void);
  }

  return routes;
})();
