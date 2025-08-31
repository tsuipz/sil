import { createAction, props } from '@ngrx/store';
import { User } from '@angular/fire/auth';

// Sign In Actions
export const signInWithGoogle = createAction('[Auth] Sign In With Google');
export const signInWithGoogleSuccess = createAction(
  '[Auth] Sign In With Google Success',
  props<{ user: User }>()
);
export const signInWithGoogleFailure = createAction(
  '[Auth] Sign In With Google Failure',
  props<{ error: string }>()
);

// Sign Out Actions
export const signOut = createAction('[Auth] Sign Out');
export const signOutSuccess = createAction('[Auth] Sign Out Success');
export const signOutFailure = createAction(
  '[Auth] Sign Out Failure',
  props<{ error: string }>()
);

// Auth State Actions
export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: User | null }>()
);

export const setInitialized = createAction(
  '[Auth] Set Initialized',
  props<{ initialized: boolean }>()
);

export const getUserProfile = createAction('[Auth] Get User Profile');
export const getUserProfileSuccess = createAction(
  '[Auth] Get User Profile Success',
  props<{ user: User }>()
);
export const getUserProfileFailure = createAction(
  '[Auth] Get User Profile Failure',
  props<{ error: string }>()
);
export const setLoading = createAction(
  '[Auth] Set Loading',
  props<{ loading: boolean }>()
);
export const clearError = createAction('[Auth] Clear Error');
