import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, get, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { Observable, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Player, Room } from './room.types';

@Injectable({ providedIn: 'root' })
export class RoomService {
  constructor(private db: Database, private auth: Auth, private router: Router) {}

  createRoom(): Observable<{ roomId: string; room: Room }> {
    const roomId = nanoid(6); // e.g., "A3F9ZQ"
    const user = this.auth.currentUser;

    if (!user) {
      return from(Promise.reject(new Error('User not authenticated')));
    }

    const room: Room = {
      hostId: user.uid,
      state: 'lobby',
      theme: '',
      thread: [],
      players: {
        [user.uid]: {
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      },
      createdAt: Date.now(),
    };

    return from(set(ref(this.db, `rooms/${roomId}`), room)).pipe(map(() => ({ roomId, room })));
  }

  joinRoom(roomId: string): Observable<{ roomId: string; room: Room }> {
    const user = this.auth.currentUser;

    if (!user) {
      return from(Promise.reject(new Error('User not authenticated')));
    }

    return from(get(ref(this.db, `rooms/${roomId}`))).pipe(
      map((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error('Room does not exist');
        }
        return snapshot.val() as Room;
      }),
      mergeMap((room) => {
        const player: Player = {
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        return from(set(ref(this.db, `rooms/${roomId}/players/${user.uid}`), player)).pipe(
          map(() => ({ roomId, room }))
        );
      })
    );
  }

  getRoom(roomId: string): Observable<Room | null> {
    return from(get(ref(this.db, `rooms/${roomId}`))).pipe(
      map((snapshot) => {
        if (!snapshot.exists()) return null;
        return snapshot.val() as Room;
      })
    );
  }

  roomExists(roomId: string): Observable<boolean> {
    return from(get(ref(this.db, `rooms/${roomId}`))).pipe(map((snapshot) => snapshot.exists()));
  }
}
