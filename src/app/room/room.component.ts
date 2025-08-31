import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-room',
  template: `
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">Game Room</h1>
          <p class="text-lg text-gray-600 mb-2">Room ID: <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ roomId }}</span></p>
          <p class="text-gray-600 mb-6">This is where the actual game will be played.</p>
          <p class="text-gray-500 text-sm">Authentication required to access this page.</p>
        </div>
      </div>
    </div>
  `,
})
export class RoomComponent {
  roomId: string;

  constructor(private route: ActivatedRoute) {
    this.roomId = this.route.snapshot.paramMap.get('id') || 'unknown';
  }
}
