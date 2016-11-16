import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../classes/category';

@Component({
    selector: 'xp-create',
    templateUrl: './create.component.html',
    styles: []
})
export class CreateComponent implements OnInit {

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {

    }

    submitAction(values) {
        alert('hello!');
        const { name } = values;

        this.categoryService.createCategory({name: name}).subscribe(
            response => {
                if (response.success) {
                    this.categoryService.addCategory(
                        new Category(
                            response.category.id,
                            response.category.name
                        )
                    );
                }
            }
        );
    }

}
