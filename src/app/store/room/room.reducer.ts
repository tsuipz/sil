import { createReducer, on } from '@ngrx/store';
import * as RoomActions from './room.actions';
import { initialState } from './room.state';

export const roomReducer = createReducer(
  initialState,

  // Create Room
  on(RoomActions.createRoom, (state) => ({
    ...state,
    isCreating: true,
    error: null,
  })),
  on(RoomActions.createRoomSuccess, (state, { roomId, room }) => ({
    ...state,
    currentRoom: room,
    roomId,
    isCreating: false,
    error: null,
  })),
  on(RoomActions.createRoomFailure, (state, { error }) => ({
    ...state,
    isCreating: false,
    error,
  })),

  // Join Room
  on(RoomActions.joinRoom, (state) => ({
    ...state,
    isJoining: true,
    error: null,
  })),
  on(RoomActions.joinRoomSuccess, (state, { roomId, room }) => ({
    ...state,
    currentRoom: room,
    roomId,
    isJoining: false,
    error: null,
  })),
  on(RoomActions.joinRoomFailure, (state, { error }) => ({
    ...state,
    isJoining: false,
    error,
  })),

  // Get Room
  on(RoomActions.getRoom, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RoomActions.getRoomSuccess, (state, { room }) => ({
    ...state,
    currentRoom: room,
    loading: false,
    error: null,
  })),
  on(RoomActions.getRoomFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Clear Actions
  on(RoomActions.clearRoom, (state) => ({
    ...state,
    currentRoom: null,
    roomId: null,
  })),
  on(RoomActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
