import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.actions';
import * as AuthSelectors from '../store/auth/auth.selectors';
import * as RoomActions from '../store/room/room.actions';
import * as RoomSelectors from '../store/room/room.selectors';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-lobby-entry',
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 relative"
    >
      <!-- User Info and Logout -->
      <div class="absolute top-4 right-4 flex items-center gap-3">
        <!-- User Info -->
        <div
          *ngIf="user$ | async as user"
          class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md"
        >
          <img
            *ngIf="user.photoURL"
            [src]="user.photoURL"
            [alt]="user.displayName || 'User'"
            class="w-6 h-6 rounded-full"
          />
          <span class="text-sm font-medium text-gray-700">{{ user.displayName || 'User' }}</span>
        </div>

        <!-- Logout Button -->
        <button
          (click)="logout()"
          class="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md transition-all duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          Logout
        </button>
      </div>

      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Game Lobby</h1>
          <p class="text-gray-600 mb-2">Create a new game or join an existing one</p>
          <p *ngIf="user$ | async as user" class="text-sm text-gray-500">
            Welcome back, {{ user.displayName || 'User' }}!
          </p>
        </div>

        <!-- Create Game Section -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Create New Game</h2>
          <button
            (click)="create()"
            [disabled]="isCreating$ | async"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <span *ngIf="isCreating$ | async" class="mr-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                  fill="none"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            {{ (isCreating$ | async) ? 'Creating...' : 'Create Game' }}
          </button>
        </div>

        <!-- Divider -->
        <div class="relative mb-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <!-- Join Game Section -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Join Existing Game</h2>
          <div class="space-y-4">
            <div>
              <label for="roomCode" class="block text-sm font-medium text-gray-700 mb-2">
                Room Code
              </label>
              <input
                id="roomCode"
                [(ngModel)]="roomCode"
                (input)="onRoomCodeInput($event)"
                placeholder="Enter 6-character code"
                maxlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                [class.border-red-500]="error$ | async"
              />
            </div>
            <button
              (click)="join()"
              [disabled]="!roomCode.trim() || (isJoining$ | async)"
              class="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <span *ngIf="isJoining$ | async" class="mr-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
              {{ (isJoining$ | async) ? 'Joining...' : 'Join Game' }}
            </button>
          </div>

          <!-- Error Message -->
          <div
            *ngIf="error$ | async as error"
            class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p class="text-red-700 text-sm">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LobbyEntryComponent {
  private store = inject(Store);

  // Selectors
  isCreating$ = this.store.select(RoomSelectors.selectIsCreating);
  isJoining$ = this.store.select(RoomSelectors.selectIsJoining);
  error$ = this.store.select(RoomSelectors.selectRoomError);
  user$ = this.store.select(AuthSelectors.selectUser);

  roomCode = '';

  onRoomCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.roomCode = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    // Clear error when user starts typing
    this.store.dispatch(RoomActions.clearError());
  }

  create(): void {
    this.store.dispatch(RoomActions.clearError());
    this.store.dispatch(RoomActions.createRoom());
  }

  join(): void {
    if (!this.roomCode.trim()) return;

    // Validate room code format (alphanumeric, 6 characters)
    const roomCode = this.roomCode.trim().toUpperCase();
    if (!/^[A-Z0-9]{6}$/.test(roomCode)) {
      this.store.dispatch(
        RoomActions.createRoomFailure({ error: 'Room code must be 6 alphanumeric characters.' })
      );
      return;
    }

    this.store.dispatch(RoomActions.joinRoom({ roomId: roomCode }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.signOut());
  }
}
