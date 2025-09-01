export interface Player {
  displayName: string | null;
  photoURL: string | null;
}

export interface Room {
  hostId: string;
  state: 'lobby' | 'playing' | 'finished';
  theme: string;
  thread: any[]; // TODO: Define thread structure
  players: Record<string, Player>;
  createdAt?: number;
}

export interface RoomCreationResult {
  roomId: string;
  room: Room;
}
