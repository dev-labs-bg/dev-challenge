import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CategoryService } from '../../admin/categories/category.service';

@Component({
    selector: 'xp-register-time-investment',
    template: `
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group mb"
                [class.has-error]="
                    ! form.controls['category_id'].valid &&
                    form.controls['category_id'].touched
                ">
                <label for="category_id">Category you wish to specialize in</label>
                <select
                    name="category_id"
                    formControlName="category_id"
                    class="form-control"
                    id="category_id">
                    <option value="" disabled="true" [selected]="true">Please Choose</option>
                    <option *ngFor="let category of categoryService.repository.getData()"
                        value="{{ category.id }}">
                        {{ category.name }}
                    </option>
                </select>
                <p class="help-block">
                    Choose carefully! All the tasks that will be assigned to you
                    will be from the chosen category
                </p>
            </div>
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['spent_time'].valid &&
                    form.controls['spent_time'].touched
                ">
                <label for="spent_time">Hours per day you could invest?</label>
                <select
                    name="spent_time"
                    formControlName="spent_time"
                    class="form-control"
                    id="spent_time">
                    <option value="" disabled="true" [selected]="true">Please Choose</option>
                    <option *ngFor="let tileSlot of tileSlots"
                        value="{{ tileSlot }}">
                        {{ tileSlot }} hours
                    </option>
                    <option value="tileSlots[tileSlots.length - 1]">
                        More then {{ tileSlots[tileSlots.length - 1] }} hours
                    </option>
                </select>
                <p class="help-block">
                    Choose carefully! Time estimations for each task
                    will be aligned with the amount of time you can invest!
                </p>
            </div>
            <button
                type="submit"
                class="btn btn-primary"
                [disabled]="! form.valid">
                Next
            </button>
        </form>
    `
})
export class TimeInvestmentComponent implements OnInit {
    @Output() onSubmit = new EventEmitter();
    form: FormGroup;
    private currentDate = new Date();
    private maxDate: Date = new Date();
    private tileSlots = [0.5, 1, 2, 4];

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.categoryService.setup();

        this.form = this.formBuilder.group({
            'category_id': ['', Validators.required],
            'spent_time': ['', Validators.required],
        });
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

}
