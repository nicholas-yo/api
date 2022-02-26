import type { Request, Response } from 'http';
import { routes } from '../gens/routes';

type Routes = Map<string, (req: Request, res: Response) => void>;

type Router = Promise<Routes>;

export const router: Router = (async () => await routes)();
