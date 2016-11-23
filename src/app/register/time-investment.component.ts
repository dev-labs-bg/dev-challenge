import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'xp-register-time-investment',
    template: `
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group">
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

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'spent_time': ['', Validators.required]
        });
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

}
