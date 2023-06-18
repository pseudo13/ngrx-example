import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CartItem } from './cart.reducer';

@Injectable({
    providedIn: 'root',
})
export class DummyBackendService {
    inventoryItems: CartItem[] = [
        { productId: 1, name: 'Item 1', price: 20 },
        { productId: 2, name: 'Item 2', price: 30 },
        { productId: 3, name: 'Item 3', price: 15 },
    ];

    fetchCartItemDetails(productId: number): Observable<any> {
        const item: CartItem = this.inventoryItems.find(item => item.productId == productId) as CartItem;
        // Simulate API call to fetch item details
        return of({ ...item }).pipe(
            delay(1000) // Simulate delay for API call
        );
    }

    fetchInventoryItems(): Observable<any[]> {
        // Simulate API call to fetch inventory items

        return of(this.inventoryItems).pipe(delay(500));
    }
}