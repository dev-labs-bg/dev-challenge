import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../../classes/category';

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

    constructor() { }

    handleCancel() {
        this.onCancel.emit();
    }

}
