import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Category } from './category';
import { NotificationService } from '../../shared/notification.service';
import { CategoryService } from './category.service';

@Component({
    selector: 'xp-admin-categories-edit',
    template: `
        <xp-loading-indicator [wait]="subscription">
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
        </xp-loading-indicator>
    `
})
export class EditComponent {
    @Input() category: Category;
    @Output() onCancel = new EventEmitter();
    private subscription: Subscription;

    constructor(
        private categoryService: CategoryService,
        private notificationService: NotificationService
    ) { }

    handleCancel() {
        this.onCancel.emit();
    }

    handleDelete(category: Category) {
        const categoryId = category.getId();

        this.subscription = this.categoryService.deleteCategory(categoryId)
            .subscribe(response => {
                this.categoryService.repository.remove(categoryId);
                this.notificationService.fireSuccess('Category deleted!');
            },
            error => console.log('Ah, record not deleted!', error)
        );
    }

    handleSubmit(values) {
        this.subscription = this.categoryService.updateCategory(values)
            .subscribe((response) => {
                let updatedCategory = new Category(
                    response.data.id,
                    response.data.name,
                    response.data.status,
                    response.data.text_status,
                );

                this.categoryService.repository.update(updatedCategory);
                this.notificationService.fireSuccess('Category updated!');
            },
            error => console.log('Ah, record not saved!', error)
        );
    }
}
