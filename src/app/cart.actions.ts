import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.reducer';

export const addToCart = createAction(
    '[Cart] Add Item',
    props<{ item: CartItem }>()
);

export const addToCartSuccess = createAction(
    '[Cart] Add Item Success',
    props<{ item: CartItem }>()
);

export const removeItemFromCart = createAction(
    '[Cart] Remove Item',
    props<{ itemId: number }>()
);
