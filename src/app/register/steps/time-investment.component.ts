import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CategoryService } from '../../admin/categories/category.service';

@Component({
    selector: 'xp-register-time-investment',
    template: `
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group">
                <div class="form-group">
                    <label for="category_id">Category you wish to specialize in</label>
                    <p>Choose carefully! All the tasks that will be assigned to you 
                    will be from the chosen category</p>
                    <select
                        name="category_id"
                        formControlName="category_id"
                        class="form-control"
                        id="category_id">
                        <option *ngFor="let category of categoryService.getCategories()"
                            value="{{ category.id }}">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <label for="spent_time">Hours per day you could spend on dev-challenge</label>
                <input
                    type="spent_time"
                    name="spent_time"
                    class="form-control"
                    id="spent_time"
                    formControlName="spent_time"
                    placeholder="1"
                />
                <div
                    *ngIf="form.controls['spent_time'].hasError('required') &&
                    form.controls['spent_time'].touched"
                    class="alert alert-danger">
                        You must fill in your available hours.
                </div>
            </div>
            <button
                type="submit"
                class="btn btn-primary"
                [disabled]="! form.valid">
                Next
            </button>
        </form>
    `,
    styles: []
})
export class TimeInvestmentComponent implements OnInit {
    @Output() onSubmit = new EventEmitter();
    form: FormGroup;
    private currentDate = new Date();
    private maxDate: Date = new Date();

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.categoryService.getAll();

        this.form = this.formBuilder.group({
            'category_id': ['', Validators.required],
            'spent_time': ['', Validators.required],
        });
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

}
