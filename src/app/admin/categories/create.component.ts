import { Component, Output, EventEmitter } from '@angular/core';

import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
    selector: 'xp-admin-category-create',
    template: `
        <div class="panel panel-primary">
            <div class="panel-heading">Create Category</div>

            <div class="panel-body">
                <xp-admin-category-form
                    (onCancel)="handleCancel($event)"
                    (onSubmit)="handleSubmit($event)">
                </xp-admin-category-form>
            </div>
        </div>
    `
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

                    this.onCancel.emit();
                }
            }
        );
    }

    handleCancel() {
        this.onCancel.emit();
    }

}
