import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { Category } from "../classes/category";

var _ = require('lodash');

@Injectable()
export class CategoryService {
    private categories: Category[];

    constructor(
        private httpService: HttpService
    ) {}

    getAll() {
        this.httpService.get('category/all').subscribe(
            response => this.categories = response.categories.map(
                el => new Category(el.id, el.name)
            )
        );
    }

    getCategories(): Category[] {
        return this.categories;
    }

    createCategory(name) {
        return this.httpService.post('category', name);
    }

    updateCategory(id, name) {
        return this.httpService.put('category/' + id, {name: name});
    }

    /**
     * Replace old category with new one
     *
     * @param category
     * @returns {Category[]}
     */
    changeCategoriesValue(category: Category) {
        let id = category.getId();
        let categoryIndex = _.findIndex(this.categories, { id });

        this.categories[categoryIndex] = category;

        return this.categories;
    }

    addCategory(category: Category) {
        this.categories.push(category);
    }

}
