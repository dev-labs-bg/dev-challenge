import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { Category } from "../classes/category";

@Injectable()
export class CategoryService {
    private categories: Category[];

    constructor(
        private httpService: HttpService
    ) {}

    getAll() {
        this.httpService.get('category/all').subscribe(
            response => this.categories = response.categories.map(
                el => new Category(el.name)
            )
        );
    }

    getCategories(): Category[] {
        return this.categories;
    }

    createCategory(name) {
        return this.httpService.post('category', name);
    }

    addCategory(category: Category) {
        this.categories.push(category);
    }

}
