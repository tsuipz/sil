import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'lobby',
    canActivate: [authGuard],
    loadComponent: () => import('./lobby/lobby.component').then((m) => m.LobbyComponent),
  },
  {
    path: 'room/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./room/room.component').then((m) => m.RoomComponent),
  },
];
