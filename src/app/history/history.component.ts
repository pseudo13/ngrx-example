import { Component } from "@angular/core";
import { selectCanUndo, selectCanRedo, StoreState } from "../appStore";
import { Store, select } from "@ngrx/store";
import { NonNullAssert } from "@angular/compiler";
import { map } from "rxjs";

@Component({
    selector: "app-history",
    template: `
    <button (click)="undo()" [disabled]="undoDisabled">Undo</button>
    <button (click)="redo()" [disabled]="redoDisabled">Redo</button>
  `,
})
export class UndoRedoComponent {

    undoDisabled: boolean = false;
    redoDisabled: boolean = false;

    constructor(private store: Store<StoreState>) {
        this.store.select(state => state.cart.histories).subscribe(state => {
            console.log(state['DEFAULT'])
            this.undoDisabled = state['DEFAULT'].undoable?.length <= 0;
            this.redoDisabled = state['DEFAULT'].undone?.length <= 0;
        })
    }



    undo(): void {
        this.store.dispatch({ type: 'UNDO' });
    }

    redo(): void {
        this.store.dispatch({ type: 'REDO' });
    }
}