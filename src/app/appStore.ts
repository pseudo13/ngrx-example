import { Action, ActionReducer, ActionReducerMap, MetaReducer, StoreModule, createFeatureSelector, createSelector } from '@ngrx/store';

import { localStorageSync } from 'ngrx-store-localstorage';

import { createHistorySelectors } from "ngrx-wieder";

import { CartState, cartReducer } from './cart.reducer';
import { AuthState, authReducer } from './auth.reducer';

export interface StoreState {
    auth: AuthState;
    cart: CartState;
}

export const reducers: ActionReducerMap<StoreState> = { auth: authReducer, cart: cartReducer };

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: ['auth', 'cart'], rehydrate: true })(reducer);
}

export function clearState(reducer: ActionReducer<StoreState>): ActionReducer<StoreState> {
    return function (state: StoreState, action: Action): StoreState {
        if (action.type === 'CLEAR_STATE') {
            state = {
                auth: { username: null, isLoggedIn: false },
                cart: {
                    items: [], inventory: [], histories: {
                        'DEFAULT': {
                            mergeBroken: false,
                            undoable: [],
                            undone: []
                        }
                    }
                }
            };
        }
        return reducer(state, action);
    } as any;
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer, clearState];

export const cartSelector = (state: StoreState) => state.cart;

export const cartItemsSelector = createSelector(cartSelector, (cartState: CartState) => cartState.items);

export const {
    selectHistory,
    selectCanUndo,
    selectCanRedo,
} = createHistorySelectors<StoreState, CartState>(state => state.cart);