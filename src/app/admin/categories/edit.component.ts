import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../../classes/category';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'xp-admin-categories-edit',
    template: `
        <div class="panel panel-warning">
            <div class="panel-heading">Edit Category</div>

            <div class="panel-body">
                <xp-category-form
                    [category]=category
                    (onCancel)="handleCancel($event)"
                    (onSubmit)="handleSubmit($event)">
                </xp-category-form>
            </div>
        </div>
    `
})
export class EditComponent {
    @Input() category: Category;
    @Output() onCancel = new EventEmitter();

    constructor(private categoryService: CategoryService) { }

    handleCancel() {
        this.onCancel.emit();
    }

    handleSubmit(values) {
        const { id, name } = values;

        this.categoryService.updateCategory(id, name).subscribe(
            response => {
                if (response.success) {
                    let updatedCategory = new Category(
                        response.category.id,
                        response.category.name
                    );

                    this.categoryService.updateMainArray(updatedCategory);
                }
            }
        );
    }
}
