import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../classes/category';

@Component({
    selector: 'xp-admin-categories-list',
    template: `
        <ul class="list-group">
            <li
                class="list-group-item"
                *ngFor="let category of categoryService.getCategories()">
                <a
                    href="javascript:;"
                    (click)="toggleMode('EDIT', category)">
                    {{ category.name }}
                </a>

                <div *ngIf="mode === 'EDIT' && category === selectedCategory">
                    <hr />
                    <xp-admin-categories-edit
                        [category]=category
                        (onCancel)="toggleMode('DISPLAY')"
                    ></xp-admin-categories-edit>
                </div>
            </li>
        </ul>
    `
})
export class ListComponent implements OnInit {
    private mode: string = 'DISPLAY';
    private selectedCategory: Category;

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.categoryService.getAll();
    }

    toggleMode(nextState = 'DISPLAY', category: Category = null) {
        this.mode = nextState;
        this.toggleSelectedCategory(category);
    }

    toggleSelectedCategory(nextCategory: Category) {
        this.selectedCategory = nextCategory;
    }
}
