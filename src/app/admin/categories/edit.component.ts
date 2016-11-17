import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../../classes/category';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'xp-admin-categories-edit',
    template: `
        <div class="panel panel-warning">
            <div class="panel-heading">Edit Category</div>

            <div class="panel-body">
                <xp-admin-category-form
                    [category]=category
                    (onCancel)="handleCancel($event)"
                    (onDelete)="handleDelete($event)"
                    (onSubmit)="handleSubmit($event)">
                </xp-admin-category-form>
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

    handleDelete(category: Category) {
        const categoryId = category.getId();

        this.categoryService.deleteCategory(categoryId).subscribe(
            response => {
                if (response.success) {
                    this.categoryService.removeCategory(categoryId);
                }
            }
        );
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
