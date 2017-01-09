import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';
import { HttpService } from '../../services/http.service';
import { Category } from './category';

@Injectable()
export class CategoryService {
    private categories: Category[];

    /**
     * Category available statuses
     * 
     * @type {Array}
     */
    public statuses = [
        'Draft',
        'Published',
        'Disabled',
    ];

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
    getAll(): Subscription {
        return this.httpService.get('category/all').subscribe(
            response => 
                this.categories = response.categories.map(
                    el => new Category(
                        el.id, 
                        el.name, 
                        el.status, 
                        el.text_status
                    )
                ),
            error => console.log('Could not get all categories!', error)
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
    updateCategory(values) {
        return this.httpService.put(`category/${values.id}`, values);
    }

    /**
     * Delete category API request
     *
     * @param id - category id
     * @returns {Observable<R>}
     */
    deleteCategory(id: number) {
        return this.httpService.delete(`category/${id}`);
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

    findCategory(id) {
        const foundCategory = _.find(this.categories,
            category => category.getId() === id
        );

        return foundCategory;
    }

}
