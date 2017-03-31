import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { REGISTRATION_MODES } from '../constants';

@Component({
    selector: 'xp-register-additional-info',
    template: `
        <div class="alert alert-success">Fields below are optional</div>
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['date_of_birth'].valid &&
                    form.controls['date_of_birth'].touched
                ">
                <label class="block-display">Year of Birth</label>
                <input
                    type="text"
                    name="date_of_birth"
                    class="form-control"
                    id="date_of_birth"
                    formControlName="date_of_birth"
                    placeholder="Year of Birth"
                />
            </div>
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['city'].valid &&
                    form.controls['city'].touched
                ">
                <label for="city">City</label>
                <input
                    type="city"
                    name="city"
                    class="form-control"
                    id="city"
                    formControlName="city"
                    placeholder="City"
                />
            </div>
            <div class="form-group">
                <label for="university">University</label>
                <input
                    #university
                    type="university"
                    name="university"
                    class="form-control"
                    id="university"
                    formControlName="university"
                    placeholder="University"
                />
            </div>
            <div class="form-group" *ngIf="university.value.length">
                <label for="year_of_study">Year of study</label>
                <input
                    type="year_of_study"
                    name="year_of_study"
                    class="form-control"
                    id="year_of_study"
                    formControlName="year_of_study"
                    placeholder="Year of study"
                />
            </div>
            <button
                class="btn btn-primary"
                (click)="goBack()">
                Back
            </button>
            <button
                type="submit"
                class="btn btn-primary"
                [disabled]="! form.valid">
                Finish!
            </button>
        </form>
    `,
    styles: []
})
export class AdditionalInfoComponent implements OnInit {
    @Output() onSubmit = new EventEmitter();
    @Output() goToPreviousStep = new EventEmitter();
    private modes: any = REGISTRATION_MODES;
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'city': [''],
            'university': [''],
            'year_of_study': [''],
            'date_of_birth': ['']
        });
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

    /**
     * go back to previous step
    **/
    goBack() {
        this.goToPreviousStep.emit(this.modes.TIME_INVESTMENT);
    }
}
