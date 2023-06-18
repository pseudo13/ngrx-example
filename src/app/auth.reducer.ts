import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

export interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
}

export const authState: AuthState = {
    isLoggedIn: false,
    username: null,
};

export const authReducer = createReducer(
    authState,
    on(login, (state, { username }) => ({
        ...state,
        isLoggedIn: true,
        username,
    })),
    on(logout, (state) => ({
        ...state,
        isLoggedIn: false,
        username: null,
    }))
);