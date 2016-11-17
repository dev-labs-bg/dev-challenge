import { Component } from '@angular/core';

@Component({
    selector: 'xp-admin-categories',
    templateUrl: './categories.component.html'
})
export class AdminCategoriesComponent {
    private mode = 'DISPLAY';

    constructor() { }

    toggleMode(nextState: string) {
        this.mode = nextState;
    }

}
