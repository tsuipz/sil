import { createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialState,
  
  // Sign In With Google
  on(AuthActions.signInWithGoogle, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(AuthActions.signInWithGoogleSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  
  on(AuthActions.signInWithGoogleFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Sign Out
  on(AuthActions.signOut, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  
  on(AuthActions.signOutSuccess, (state) => ({
    ...state,
    user: null,
    loading: false,
    error: null,
  })),
  
  on(AuthActions.signOutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  // Auth State
           on(AuthActions.setUser, (state, { user }) => ({
           ...state,
           user,
         })),

         on(AuthActions.setInitialized, (state, { initialized }) => ({
           ...state,
           initialized,
         })),

         // Get User Profile
         on(AuthActions.getUserProfile, (state) => ({
           ...state,
           loading: true,
           error: null,
         })),

         on(AuthActions.getUserProfileSuccess, (state, { user }) => ({
           ...state,
           user,
           loading: false,
           error: null,
         })),

         on(AuthActions.getUserProfileFailure, (state, { error }) => ({
           ...state,
           loading: false,
           error,
         })),
  
  on(AuthActions.setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
