import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
    selector: 'xp-admin-categories-list',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <ul class="list-group">
                <li
                    class="list-group-item"
                    *ngFor="let category of categoryService.repository.getData()">
                    <a
                        href="javascript:;"
                        (click)="toggleMode('EDIT', category)">
                        {{ category.name }}
                    </a>

                    <div class="category-status">
                        <div [class]="switchLabels(category.text_status)">
                            {{ category.text_status }}
                        </div>
                    </div>

                    <div *ngIf="mode === 'EDIT' && category === selectedCategory">
                        <hr />
                        <xp-admin-categories-edit
                            [category]=category
                            (onCancel)="toggleMode('DISPLAY')"
                        ></xp-admin-categories-edit>
                    </div>
                </li>
            </ul>
        </xp-loading-indicator>
    `
})
export class ListComponent implements OnInit {
    private mode: string = 'DISPLAY';
    private selectedCategory: Category;
    private subscription: Subscription;

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.subscription = this.categoryService.setup();
    }

    toggleMode(nextState = 'DISPLAY', category: Category = null) {
        this.mode = nextState;
        this.toggleSelectedCategory(category);
    }

    toggleSelectedCategory(nextCategory: Category) {
        this.selectedCategory = nextCategory;
    }

    /**
     * Switch label according to class
     * 
     * @param {string} Category text_status
     */
    switchLabels(textStatus) {
        switch (textStatus) {
            case "draft":
                return "label label-warning text-uppercase";

            case "published":
                return "label label-success text-uppercase";

            case "disabled":
                return "label label-danger text-uppercase";
            
            default:
                return "";
        }
    }
}
