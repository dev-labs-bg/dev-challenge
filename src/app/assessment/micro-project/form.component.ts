import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'xp-assessment-micro-project-form',
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
                    'text-danger': countWords(message.value) > wordsLimit,
                    'text-success': countWords(message.value) <= wordsLimit
                }">
                <strong>
                    {{ wordsLimit - countWords(message.value) }} words left
                </strong>
            </p>
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

            if (this.countWords(message.value) > maxWords) {
                return {
                    mismatchedWordsCount: true
                };
            }
        };

    }

    /**
     * Count words in any string, see:
     * http://stackoverflow.com/a/18679657/1333836
     *
     * @param {string} s
     */
    private countWords(s) {
        if (! s.trim().length) {
            return 0;
        }

        // exclude  start and end white-space
        s = s.replace(/(^\s*)|(\s*$)/gi, '');
        // 2 or more space to 1
        s = s.replace(/[ ]{2,}/gi, ' ');
        // exclude newline with a start spacing
        s = s.replace(/\n /, '\n');

        return s.split(' ').length;
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

}
