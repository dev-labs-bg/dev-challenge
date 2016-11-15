import { Injectable } from '@angular/core';
import {Category} from "../../../../classes/category";

@Injectable()
export class CategoryFormService {
    public categoryCreationTab: boolean = false;
    private selectedCategory: Category = null;

    constructor() { }

    /**
     * Change categoryCreationTab to true
     *
     * @returns void
     */
    showCategoryCreationTab() {
        this.categoryCreationTab = true;
    }

    /**
     * Change categoryCreationTab to false
     *
     * @returns void
     */
    hideCategoryCreationTab(category) {
        if (category == null) {
            this.categoryCreationTab = false;
        } else {
            this.selectedCategory = null;
        }
    }

    /**
     * Switch the selected category
     * so we could easily interact with it
     *
     * @param category
     */
    showCategoryEditTab(category) {
        this.selectedCategory = category;
    }

    /**
     * Check to see if the selected category
     * is the current one we're displaying
     *
     * @param category
     * @returns {boolean}
     */
    isSelected(category) {
        return (this.selectedCategory == category);
    }

}
