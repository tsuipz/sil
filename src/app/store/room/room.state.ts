import { Room } from '../../core/room.types';

export interface RoomState {
  currentRoom: Room | null;
  roomId: string | null;
  loading: boolean;
  error: string | null;
  isCreating: boolean;
  isJoining: boolean;
}

export const initialState: RoomState = {
  currentRoom: null,
  roomId: null,
  loading: false,
  error: null,
  isCreating: false,
  isJoining: false,
};
