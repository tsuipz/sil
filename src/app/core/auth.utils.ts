import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { authState } from 'rxfire/auth';
import { map, take } from 'rxjs/operators';

/**
 * Redirects unauthenticated users to the login page
 */
export const redirectToLogin = (): void => {
  const router = inject(Router);
  router.navigate(['/']);
};

/**
 * Checks if user is authenticated and redirects to login if not
 * @returns Observable<boolean> - true if authenticated, false if redirected
 */
export const checkAuthAndRedirect = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    map((user) => {
      if (user) return true;
      router.navigate(['/']);
      return false;
    })
  );
};

/**
 * Gets the current auth state without redirecting
 * @returns Observable<User | null>
 */
export const getCurrentUser = () => {
  const auth = inject(Auth);
  return authState(auth).pipe(take(1));
};
