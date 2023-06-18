import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { addToCart, removeItemFromCart } from '../cart.actions';
import { CartItem, cartReducer } from '../cart.reducer';
import { Observable, Subject } from 'rxjs';
import { StoreState, cartItemsSelector } from '../appStore';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  items: CartItem[] = [];

  items$: Observable<any>;

  constructor(private store: Store<StoreState>) {
    this.items$ = this.store.pipe(select(cartItemsSelector));
    this.store.select('cart').subscribe((cart) => {
      this.items = cart.items;
    });
  }

  handleRemoveFromCart(item: CartItem) {
    this.store.dispatch(removeItemFromCart({ itemId: item.id! }));
  }
}