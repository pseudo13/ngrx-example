import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule, createFeatureSelector, createSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { CartState, cartReducer } from './cart.reducer';
import { CartEffects } from './cart.effects';
import { AuthState, authReducer } from './auth.reducer';
import { AuthEffects } from './auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './appStore';
import { UndoRedoComponent } from './history/history.component';

@NgModule({
  declarations: [AppComponent, CartComponent, InventoryComponent, LoginComponent, UndoRedoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([CartEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      serialize: true,
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }