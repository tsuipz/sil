import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { RoomService } from '../../core/room.service';
import * as RoomActions from './room.actions';

@Injectable()
export class RoomEffects {
  private actions$ = inject(Actions);
  private roomService = inject(RoomService);
  private router = inject(Router);

  createRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.createRoom),
      mergeMap(() =>
        this.roomService.createRoom().pipe(
          map(({ roomId, room }) => RoomActions.createRoomSuccess({ roomId, room })),
          catchError((error) => of(RoomActions.createRoomFailure({ error: error.message })))
        )
      )
    )
  );

  createRoomSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RoomActions.createRoomSuccess),
        tap(({ roomId }) => this.router.navigate(['/room', roomId]))
      ),
    { dispatch: false }
  );

  joinRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.joinRoom),
      mergeMap(({ roomId }) =>
        this.roomService.joinRoom(roomId).pipe(
          map(({ roomId, room }) => RoomActions.joinRoomSuccess({ roomId, room })),
          catchError((error) => of(RoomActions.joinRoomFailure({ error: error.message })))
        )
      )
    )
  );

  joinRoomSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RoomActions.joinRoomSuccess),
        tap(({ roomId }) => this.router.navigate(['/room', roomId]))
      ),
    { dispatch: false }
  );

  getRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.getRoom),
      mergeMap(({ roomId }) =>
        this.roomService.getRoom(roomId).pipe(
          map((room) => {
            if (room) {
              return RoomActions.getRoomSuccess({ room });
            } else {
              return RoomActions.getRoomFailure({ error: 'Room not found' });
            }
          }),
          catchError((error) => of(RoomActions.getRoomFailure({ error: error.message })))
        )
      )
    )
  );
}
