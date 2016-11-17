import { Component } from '@angular/core';

@Component({
    selector: 'xp-admin-categories',
    template: `
        <h1>
            Categories Management
            <button class="btn btn-default" (click)="toggleMode('CREATE')">
                + Add Category
            </button>
        </h1>

        <div *ngIf="mode === 'CREATE'">
            <xp-admin-category-create (onCancel)="toggleMode('DISPLAY')">
            </xp-admin-category-create>
        </div>

        <xp-admin-categories-list></xp-admin-categories-list>
    `
})
export class AdminCategoriesComponent {
    private mode = 'DISPLAY';

    constructor() { }

    toggleMode(nextState: string) {
        this.mode = nextState;
    }

}
