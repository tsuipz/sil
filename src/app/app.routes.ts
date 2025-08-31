import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'lobby',
    loadComponent: () => import('./lobby/lobby.component').then((m) => m.LobbyComponent),
  },
  {
    path: 'room/:id',
    loadComponent: () => import('./room/room.component').then((m) => m.RoomComponent),
  },
];
