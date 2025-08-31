import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, User, user } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as AuthActions from '../store/auth/auth.actions';
import * as AuthSelectors from '../store/auth/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private auth: Auth, private store: Store) {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);
  }

  getUserProfile() {
    return user(this.auth).pipe(
      map((firebaseUser) => {
        if (firebaseUser) {
          // Create a plain object copy to avoid NgRx freeze issues
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            isAnonymous: firebaseUser.isAnonymous,
            metadata: {
              creationTime: firebaseUser.metadata.creationTime,
              lastSignInTime: firebaseUser.metadata.lastSignInTime,
            },
            providerData: firebaseUser.providerData.map((provider) => ({
              uid: provider.uid,
              displayName: provider.displayName,
              email: provider.email,
              photoURL: provider.photoURL,
              providerId: provider.providerId,
            })),
          };
          return { user: userData };
        } else {
          return { user: null };
        }
      })
    );
  }

  signInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      map((result) => {
        // Create a plain object copy to avoid NgRx freeze issues
        const userData = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          emailVerified: result.user.emailVerified,
          isAnonymous: result.user.isAnonymous,
          metadata: {
            creationTime: result.user.metadata.creationTime,
            lastSignInTime: result.user.metadata.lastSignInTime,
          },
          providerData: result.user.providerData.map((provider) => ({
            uid: provider.uid,
            displayName: provider.displayName,
            email: provider.email,
            photoURL: provider.photoURL,
            providerId: provider.providerId,
          })),
        };
        return { user: userData };
      })
    );
  }

  signOut() {
    return from(this.auth.signOut());
  }

  clearError(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
