import { createReducer, createSelector, on } from '@ngrx/store';
import { UndoRedoState, initialUndoRedoState, undoRedo } from "ngrx-wieder";

import * as CartActions from './cart.actions';

export interface CartItem {
    id?: number;
    productId: number;
    name: string;
    price: number;
}

export interface CartState extends UndoRedoState {
    items: CartItem[];
    inventory: CartItem[];
}

export const cartState: CartState = {
    items: [],
    inventory: [],
    ...initialUndoRedoState
};

// initialize ngrx-wieder with custom config

const { createUndoRedoReducer } = undoRedo({
    // allowedActionTypes: [CartActions.addToCartSuccess.name, CartActions.removeItemFromCart.name,],
});

export const cartReducer = createUndoRedoReducer(
    cartState,
    on(CartActions.addToCartSuccess, (state, { item }) => {
        state.items = [...state.items, item]
        return state;
    }),
    on(CartActions.removeItemFromCart, (state, { itemId }) => {
        state.items = state.items.filter((item) => item.id !== itemId);
        return state;
    })
);

