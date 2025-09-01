import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomState } from './room.state';

export const selectRoomState = createFeatureSelector<RoomState>('room');

export const selectCurrentRoom = createSelector(selectRoomState, (state) => state.currentRoom);

export const selectRoomId = createSelector(selectRoomState, (state) => state.roomId);

export const selectRoomLoading = createSelector(selectRoomState, (state) => state.loading);

export const selectRoomError = createSelector(selectRoomState, (state) => state.error);

export const selectIsCreating = createSelector(selectRoomState, (state) => state.isCreating);

export const selectIsJoining = createSelector(selectRoomState, (state) => state.isJoining);

export const selectRoomPlayers = createSelector(selectCurrentRoom, (room) => room?.players || {});

export const selectRoomHostId = createSelector(selectCurrentRoom, (room) => room?.hostId);
