import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from '../../core/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  signInWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      mergeMap(() =>
        this.authService.signInWithGoogle().pipe(
          map((result) => AuthActions.signInWithGoogleSuccess({ user: result.user as any })),
          catchError((error) =>
            of(
              AuthActions.signInWithGoogleFailure({
                error: error.message || 'Sign in failed',
              })
            )
          )
        )
      )
    );
  });

  signInWithGoogleSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInWithGoogleSuccess),
        tap(() => this.router.navigate(['/lobby']))
      );
    },
    { dispatch: false }
  );

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      mergeMap(() =>
        this.authService.signOut().pipe(
          map(() => AuthActions.signOutSuccess()),
          catchError((error) =>
            of(
              AuthActions.signOutFailure({
                error: error.message || 'Sign out failed',
              })
            )
          )
        )
      )
    );
  });

  signOutSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signOutSuccess),
        tap(() => this.router.navigate(['/']))
      );
    },
    { dispatch: false }
  );

  getUserProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getUserProfile),
      mergeMap(() =>
        this.authService.getUserProfile().pipe(
          map((result) => AuthActions.getUserProfileSuccess({ user: result.user as any })),
          catchError((error) =>
            of(
              AuthActions.getUserProfileFailure({
                error: error.message || 'Failed to get user profile',
              })
            )
          )
        )
      )
    );
  });
}
