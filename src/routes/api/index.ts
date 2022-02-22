import { registerUser } from './auth/register';
import { logUser } from './auth/login';
import { users } from './users';
import { user } from './user';

export const apiRoutes = (() => {
  return {
    ...registerUser,
    ...logUser,
    ...users,
    ...user
  };
})();
