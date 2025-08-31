import { CanActivateFn } from '@angular/router';
import { checkAuthAndRedirect } from './auth.utils';

export const authGuard: CanActivateFn = () => {
  return checkAuthAndRedirect();
};
