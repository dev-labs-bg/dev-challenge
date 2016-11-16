import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category.service";
import { CategoryFormService } from "./form/category-form.service";

@Component({
    selector: 'xp-admin-categories',
    templateUrl: './admin-categories.component.html',
    styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
    private state = 'DISPLAY';

    constructor(
        private categoryService: CategoryService,
        private categoryFormService: CategoryFormService
    ) {
        this.categoryService.getAll();
    }

    ngOnInit() {
        //
    }

    toggleState(nextState: string) {
        this.state = nextState;
    }

}
