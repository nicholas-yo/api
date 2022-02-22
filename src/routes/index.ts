import { apiRoutes } from './api/index';
import { notFound } from './404';

export const routes = (() => {
  return { ...apiRoutes, ...notFound };
})();
