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

    /**
     * Get all categories from API,
     * parse them to Category class
     * and save them to this.categories
     *
     * @returns {Subscription}
     */
    getAll() {
        return this.httpService.get('category/all').subscribe(
            response => this.categories = response.categories.map(
                el => new Category(el.id, el.name)
            )
        );
    }

    /**
     * Return all categories
     *
     * @returns {Category[]}
     */
    getCategories(): Category[] {
        return this.categories;
    }

    /**
     * Create category API call
     *
     * @param name - new category name
     * @returns {Observable<R>}
     */
    createCategory(name) {
        return this.httpService.post('category', name);
    }

    /**
     * Update category api call
     *
     * @param id - id of the category
     * @param name - new category name
     * @returns {Observable<R>}
     */
    updateCategory(id, name) {
        return this.httpService.put('category/' + id, {name: name});
    }

    /**
     * Delete category API request
     *
     * @param id - category id
     * @returns {Observable<R>}
     */
    deleteCategory(id: number) {
        return this.httpService.delete('category/' + id);
    }

    /**
     * Add a category to main categories []
     *
     * @param category
     * @returns {Category[]}
     */
    addCategory(category: Category) {
        this.categories.push(category);

        return this.categories;
    }

    /**
     * Replaces old category with new one
     * from main categories []
     *
     * @param category
     * @returns {Category[]}
     */
    updateMainArray(category: Category) {
        let id = category.getId();
        let categoryIndex = _.findIndex(this.categories, { id });

        this.categories[categoryIndex] = category;

        return this.categories;
    }

    /**
     * Removes a category item from the main
     * categories []
     *
     * @param id - category id
     * @returns {any}
     */
    removeCategory(id: number) {
        return _.remove(this.categories, { id });
    }

}
