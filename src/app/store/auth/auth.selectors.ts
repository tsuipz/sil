import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectUser,
  (user) => !!user
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectAuthInitialized = createSelector(
  selectAuthState,
  (state) => state.initialized
);

export const selectUserDisplayName = createSelector(
  selectUser,
  (user) => user?.displayName || 'Player'
);

export const selectUserEmail = createSelector(
  selectUser,
  (user) => user?.email
);

export const selectUserPhotoURL = createSelector(
  selectUser,
  (user) => user?.photoURL
);
