import type { Request, Response } from 'http';
import { paths } from '@utils/paths';

type Router = Promise<Map<string, (req: Request, res: Response) => void>>;

export const router: Router = (async () => {
  const routes = (() =>
    new Map<string, (req: Request, res: Response) => void>())();

  async function* modules(path: string) {
    yield await import(path);
  }

  for await (const path of paths) {
    const module = (await modules(path).next()).value;
    const routePath = path.slice(26, path.length).replace(/.js$/, '');
    const [moduleReturn] = Object.values(module);

    routes.set(
      routePath,
      moduleReturn as (req: Request, res: Response) => void
    );
  }

  return routes;
})();
