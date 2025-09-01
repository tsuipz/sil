import { createAction, props } from '@ngrx/store';
import { Room } from '../../core/room.types';

// Create Room Actions
export const createRoom = createAction('[Room] Create Room');
export const createRoomSuccess = createAction(
  '[Room] Create Room Success',
  props<{ roomId: string; room: Room }>()
);
export const createRoomFailure = createAction(
  '[Room] Create Room Failure',
  props<{ error: string }>()
);

// Join Room Actions
export const joinRoom = createAction('[Room] Join Room', props<{ roomId: string }>());
export const joinRoomSuccess = createAction(
  '[Room] Join Room Success',
  props<{ roomId: string; room: Room }>()
);
export const joinRoomFailure = createAction('[Room] Join Room Failure', props<{ error: string }>());

// Get Room Actions
export const getRoom = createAction('[Room] Get Room', props<{ roomId: string }>());
export const getRoomSuccess = createAction('[Room] Get Room Success', props<{ room: Room }>());
export const getRoomFailure = createAction('[Room] Get Room Failure', props<{ error: string }>());

// Clear Room Actions
export const clearRoom = createAction('[Room] Clear Room');
export const clearError = createAction('[Room] Clear Error');
