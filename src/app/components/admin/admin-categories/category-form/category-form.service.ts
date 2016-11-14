import { Injectable } from '@angular/core';

@Injectable()
export class CategoryFormService {
    public categoryCreationTab: boolean = false;

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
    hideCategoryCreationTab() {
        this.categoryCreationTab = false;
    }

}
