import { Component, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { NotificationService } from '../../shared/notification.service';
import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
    selector: 'xp-admin-category-create',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <div class="panel panel-primary">
                <div class="panel-heading">Create Category</div>

                <div class="panel-body">
                    <xp-admin-category-form
                        (onCancel)="handleCancel($event)"
                        (onSubmit)="handleSubmit($event)">
                    </xp-admin-category-form>
                </div>
            </div>
        </xp-loading-indicator>
    `
})
export class CreateComponent {
    @Output() onCancel = new EventEmitter();
    private subscription: Subscription;

    constructor(
        private categoryService: CategoryService,
        private notificationService: NotificationService
    ) { }

    handleSubmit(values) {
        this.subscription = this.categoryService.createCategory(values)
            .subscribe(response => {
                this.categoryService.addCategory(
                    new Category(
                        response.category.id,
                        response.category.name,
                        response.category.status,
                        response.category.text_status,
                    )
                );

                this.onCancel.emit();
                this.notificationService.fireSuccess('Category added!');
            },
            error => console.log('Ah, record not created!', error)
        );
    }

    handleCancel() {
        this.onCancel.emit();
    }

}
