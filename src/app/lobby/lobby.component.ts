import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.actions';
import * as AuthSelectors from '../store/auth/auth.selectors';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-lobby',
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <!-- User Info Section -->
        <div *ngIf="user$ | async as user" class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="flex items-center space-x-4">
            <img
              *ngIf="user.photoURL"
              [src]="user.photoURL"
              alt="Profile"
              class="w-16 h-16 rounded-full border-2 border-gray-200"
            />
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-gray-800">
                Welcome, {{ user.displayName || 'Player' }}!
              </h1>
              <p class="text-gray-600">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <!-- Lobby Content -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Game Lobby</h2>
          <p class="text-gray-600 mb-8">
            Welcome to the lobby! This is where you can join or create games.
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 justify-center">
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              (click)="createGame()"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Create New Game</span>
            </button>

            <button
              class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              (click)="joinGame()"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span>Join Game</span>
            </button>

            <button
              class="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              (click)="signOut()"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LobbyComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  // Selectors
  user$ = this.store.select(AuthSelectors.selectUser);
  isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);

  ngOnInit() {
    // Check if user is authenticated
    this.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        this.router.navigate(['/']);
      }
    });

    // Listen for sign out success
    this.user$.subscribe((user: any) => {
      if (!user) {
        this.router.navigate(['/']);
      }
    });
  }

  signOut(): void {
    this.store.dispatch(AuthActions.signOut());
  }

  createGame(): void {
    // TODO: Implement game creation
  }

  joinGame(): void {
    // TODO: Implement game joining
  }
}
