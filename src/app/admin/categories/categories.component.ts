import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryFormService } from './form/category-form.service';

@Component({
    selector: 'xp-admin-categories',
    templateUrl: './categories.component.html'
})
export class AdminCategoriesComponent implements OnInit {
    private mode = 'DISPLAY';

    constructor(
        private categoryService: CategoryService,
        private categoryFormService: CategoryFormService
    ) {
        this.categoryService.getAll();
    }

    ngOnInit() {
        //
    }

    toggleMode(nextState: string) {
        this.mode = nextState;
    }

}
