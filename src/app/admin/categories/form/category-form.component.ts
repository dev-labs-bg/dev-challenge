import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../classes/category";

@Component({
  selector: 'xp-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
    @Input() category: Category;
    @Output() onSubmit = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @Output() onCancel = new EventEmitter();

    /**
     * @var category form
     */
    public form: FormGroup;

    /**
     * @var Category Creation success after submit
     * @type {boolean}
     */
    public showCreationSuccess: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService
    ) { }

    /**
     * Init category form
     */
    ngOnInit() {
        let formId = (this.category != null) ? this.category.getId() : '';
        let formName = (this.category != null) ? this.category.getName() : '';

        this.form = this.formBuilder.group({
            'id': [formId],
            'name': [formName, Validators.required]
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
