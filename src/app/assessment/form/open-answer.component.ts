import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Utils from '../../shared/utils';

@Component({
    selector: 'xp-assessment-form-open-answer',
    template: `
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group">
                <textarea
                    #message
                    required
                    rows="6"
                    formControlName="message"
                    class="form-control"></textarea>
            </div>
            <p
                class="text-right"
                [ngClass]="{
                    'text-danger': isWordsLimitReached(),
                    'text-success': ! isWordsLimitReached()
                }">
                <strong>
                    {{ countRemainingWords() }} words remaining
                </strong>
            </p>
            <button
                type="submit"
                class="btn btn-primary"
                [disabled]="! form.valid">
                {{ submitText }}
            </button>
        </form>
    `
})
export class AssessmentOpenAnswerFormComponent implements OnInit {
    @Input() private submitText: string = 'Submit';
    @Output() onSubmit = new EventEmitter();
    private form: FormGroup;
    private wordsLimit = 110;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'message': ['', Validators.required]
        }, {
            validator: this.messageMaxLength(this.wordsLimit)
        });
    }

    private messageMaxLength(maxWords) {
        return (group: FormGroup): {[key: string]: any} => {
            const { message } = group.controls;

            if (Utils.countWords(message.value) > maxWords) {
                return {
                    mismatchedWordsCount: true
                };
            }
        };

    }

    private isWordsLimitReached() {
        return Utils.countWords(this.form.value.message) > this.wordsLimit;
    }

    private countRemainingWords() {
        return this.wordsLimit - Utils.countWords(this.form.value.message);
    }

    private handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

}
