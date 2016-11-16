import { Component, Output, EventEmitter } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../classes/category';

@Component({
    selector: 'xp-admin-category-create',
    templateUrl: './create.component.html',
    styles: []
})
export class CreateComponent {
    @Output() onCancel = new EventEmitter();

    constructor(private categoryService: CategoryService) { }

    handleSubmit(values) {
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

    handleCancel() {
        this.onCancel.emit();
    }

}
