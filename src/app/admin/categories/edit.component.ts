import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category } from './category';
import { NotificationService } from '../../shared/notification.service';
import { CategoryService } from './category.service';

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

    constructor(
        private categoryService: CategoryService,
        private notificationService: NotificationService
    ) { }

    handleCancel() {
        this.onCancel.emit();
    }

    handleDelete(category: Category) {
        const categoryId = category.getId();

        this.categoryService.deleteCategory(categoryId)
            .subscribe(response => {
                this.categoryService.removeCategory(categoryId);
                this.notificationService.fireSuccess('Category deleted!');
            },
            error => console.log('Ah, record not deleted!', error)
        );
    }

    handleSubmit(values) {
        const { id, name } = values;

        this.categoryService.updateCategory(id, name)
            .subscribe((response) => {
                let updatedCategory = new Category(
                    response.category.id,
                    response.category.name
                );

                this.categoryService.updateMainArray(updatedCategory);
                this.notificationService.fireSuccess('Category updated!');
            },
            error => console.log('Ah, record not saved!', error)
        );
    }
}
