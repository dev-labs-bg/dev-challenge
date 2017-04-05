import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CategoryService } from '../../admin/categories/category.service';
import { Category } from '../../admin/categories/category';
import { REGISTRATION_MODES } from '../constants';

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
                    <option *ngFor="let category of publishedCategories"
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
                    <option value="" disabled="true">Please Choose</option>
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
                *ngIf="showGoBack"
                class="btn btn-primary"
                (click)="goBack()">
                Back
            </button>
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
    @Output() goToPreviousStep = new EventEmitter();
    @Input() userProps: any;
    @Input() showGoBack: boolean = true;
    form: FormGroup;
    private currentDate = new Date();
    private maxDate: Date = new Date();
    private tileSlots = [0.5, 1, 2, 4];
    private publishedCategories: Category[] = [];
    private modes: any = REGISTRATION_MODES;
 
    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.categoryService.getAllowedCategories().subscribe(
            response => response.data.map(
                el => this.publishedCategories.push(Category.newInstance(el))
            )
        );

        // empty cat id
        let formCategoryId = '';

        // fill in cat id if initialized
        if (this.userProps.category_id > 0) {
            formCategoryId = this.userProps.category_id
        }

        this.form = this.formBuilder.group({
            'category_id': [formCategoryId, Validators.required],
            'spent_time': [this.userProps.spent_time, Validators.required],
        });
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

    /**
     * go back to previous step
    **/
    goBack() {
        this.goToPreviousStep.emit(this.modes.MAIN_INFO);
    }

}
