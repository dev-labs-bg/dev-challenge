import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'xp-assessment-micro-project-form',
    template: `
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group">
                <textarea
                    required
                    rows="6"
                    formControlName="message"
                    class="form-control"></textarea>
            </div>
            <button
                type="submit"
                class="btn btn-primary"
                [disabled]="! form.valid">
                Submit
            </button>
        </form>
    `,
    styles: []
})
export class AssessmentMicroProjectFormComponent implements OnInit {
    @Output() onSubmit = new EventEmitter();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'message': ['', Validators.required]
        });
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

}
