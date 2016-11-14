import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../../services/category.service";
import { Category } from "../../../classes/category";
import { CategoryFormService } from "./category-form/category-form.service";

@Component({
    selector: 'xp-admin-categories',
    templateUrl: './admin-categories.component.html',
    styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
    private categories: Promise<Category[]> | Category[];
    private selectedCategory: Category;

    constructor(
        private categoryService: CategoryService,
        private categoryFormService: CategoryFormService
    ) {
        this.categoryService.getAll();
    }

    ngOnInit() {
        //
    }

    showCategoryEditTab(category) {
        this.selectedCategory = category;
    }

    isSelected(category) {
        return (this.selectedCategory == category);
    }

}
