import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('sil');

  constructor(private store: Store) {}

  ngOnInit() {
    // Initialize auth state and get user profile on app initialization
    this.store.dispatch(AuthActions.setInitialized({ initialized: true }));
    this.store.dispatch(AuthActions.getUserProfile());
  }
}
