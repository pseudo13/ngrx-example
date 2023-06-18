import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { DummyBackendService } from './dummy-backend.service';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
    addToCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CartActions.addToCart),
            switchMap((action) =>
                this.backendService.fetchCartItemDetails(action.item.productId).pipe(
                    map((fetchedItem) =>
                        CartActions.addToCartSuccess({ item: { ...fetchedItem, id: Math.random().toString().slice(0, 5) } }))
                )
            )
        )
    );

    constructor(private actions$: Actions, private backendService: DummyBackendService) { }
}