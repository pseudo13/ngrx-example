import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private store: Store) { }

  handleLogin() {
    this.store.dispatch(login({ username: this.username, password: this.password }));
  }
}