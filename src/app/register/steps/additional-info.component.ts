import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'xp-register-additional-info',
    template: `
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group">
                <label for="last_name">Last Name</label>
                    <input
                        type="last_name"
                        name="last_name"
                        class="form-control"
                        id="last_name"
                        formControlName="last_name"
                        placeholder="Last Name"
                        required
                    />
                    <div
                        *ngIf="form.controls['last_name'].hasError('required') &&
                        form.controls['last_name'].touched"
                        class="alert alert-danger">
                        You must specify a last name.
                    </div>
                </div>
                <div class="form-group">
                    <label class="block-display">Date of birth</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        class="form-control"
                        id="date_of_birth"
                        formControlName="date_of_birth"
                        placeholder="Date of Birth"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input
                        type="city"
                        name="city"
                        class="form-control"
                        id="city"
                        formControlName="city"
                        placeholder="City"
                        required
                    />
                    <div
                        *ngIf="form.controls['city'].hasError('required') &&
                        form.controls['city'].touched"
                        class="alert alert-danger">
                        You must specify a city.
                    </div>
                </div>
                <div class="form-group">
                    <label for="university">University</label>
                    <input
                        type="university"
                        name="university"
                        class="form-control"
                        id="university"
                        formControlName="university"
                        placeholder="University"
                    />
                </div>
                <div class="form-group">
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
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'last_name': ['', Validators.required],
            'city': ['', Validators.required],
            'university': [''],
            'year_of_study': [''],
            'date_of_birth': [new Date()]
        });
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }
}
