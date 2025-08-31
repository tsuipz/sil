import { User } from '@angular/fire/auth';

export interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean; // Track if Firebase has finished checking auth state
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  initialized: false, // Start as false until Firebase initializes
  error: null,
};
