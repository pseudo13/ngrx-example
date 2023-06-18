import { Component, OnInit } from '@angular/core';
import { DummyBackendService } from '../dummy-backend.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../cart.actions';
import { CartItem } from '../cart.reducer';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  inventoryItems: any[] = [];

  constructor(private backendService: DummyBackendService, private store: Store<{ cart: { items: CartItem[] } }>) { }

  ngOnInit() {
    this.fetchInventoryItems();
  }

  fetchInventoryItems() {
    this.backendService.fetchInventoryItems().subscribe((items) => {
      this.inventoryItems = items;
    });
  }

  handleAddToCart(item: any) {
    this.store.dispatch(addToCart({ item }));
  }
}