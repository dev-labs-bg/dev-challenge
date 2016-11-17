import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category';

@Component({
  selector: 'xp-admin-category-form',
  templateUrl: './form.component.html'
})
export class CategoryFormComponent implements OnInit {
    @Input() category: Category = new Category();
    @Output() onSubmit = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @Output() onCancel = new EventEmitter();

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'id': this.category.getId(),
            'name': [this.category.getName(), Validators.required]
        });
    }

    handleDelete(category: Category) {
        let confirmation = `Are you sure to want to delete category with name: ${category.getName()}`;

        if (confirm(confirmation)) {
            this.onDelete.emit(category);
        }
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

    handleCancel() {
        this.onCancel.emit();
    }

}
