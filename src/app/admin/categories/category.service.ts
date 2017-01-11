import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';
import { HttpService } from '../../services/http.service';
import { Category } from './category';
import { Repository } from '../../core/repository';

@Injectable()
export class CategoryService {
    public repository: Repository = new Repository();
    public apiGetURLS = {
        all: this.httpService.get('category/all'),
    };
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
     * Setup repository function
     *
     * @returns {Object|Subscription}
     */
    setup() {
        return this.repository.setup(
            this.apiGetURLS.all,
            Category
        );
    }

    /**
     * Reset repository function
     *
     * @returns {Object|Subscription}
     */
    reset() {
        return this.repository.reset(
            this.apiGetURLS.all,
            Category
        );
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
}
