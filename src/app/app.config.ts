import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore(),
    provideRouterStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideFirebaseApp(() => initializeApp({ projectId: "***REMOVED***", appId: "***REMOVED***", storageBucket: "***REMOVED***.firebasestorage.app", apiKey: "***REMOVED***", authDomain: "***REMOVED***.firebaseapp.com", messagingSenderId: "***REMOVED***" })), provideAuth(() => getAuth()), provideDatabase(() => getDatabase()), provideFunctions(() => getFunctions())
]
};
