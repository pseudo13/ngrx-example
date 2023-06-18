import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearState, login, logout } from './auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private store: Store<{ auth: { isLoggedIn: boolean } }>) {
    this.store.select('auth').subscribe((auth) => {
      this.isLoggedIn = auth.isLoggedIn;
    });
  }

  handleLogout() {
    this.store.dispatch(logout());
    this.store.dispatch(clearState());
  }
}