import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { login, logout } from './auth.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
    login$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(login),
                tap(({ username }) => {
                    localStorage.setItem('username', username);
                })
            ),
        { dispatch: false }
    );

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(logout),
                tap(() => {
                    localStorage.removeItem('username');
                })
            ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, private store: Store) { }
}