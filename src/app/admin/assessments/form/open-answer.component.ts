import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

import {Question} from '../question';
import {Task} from '../../tasks/task';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {QuestionService} from '../question.service';

@Component({
    selector: 'xp-admin-assessment-form-open-answer',
    template: `
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group">
                <textarea
                    formControlName="body"
                    class="form-control"
                    name="open_question"
                    rows="5"
                    id="open_question"></textarea>
            </div>
            <div class="form-group">
                <button
                    type="submit"
                    class="btn btn-primary">
                    {{ submitText }}
                </button>
            </div>
        </form>
    `
})
export class AdminAssessmentOpenAnswerForm implements OnInit, OnChanges {
    @Input() private task: Task = new Task();
    @Input() private question: Question = new Question();
    @Input() private submitText: string = 'Submit';
    @Output() onSubmit = new EventEmitter();
    private form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private questionService: QuestionService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'task_id': [this.task.id, Validators.required],
            'body': [this.question.body, Validators.required]
        });
    }

    /**
     * If new input (data) comes, without the component being re-rendered,
     * we need to update the form values.
     * Otherwise, we end up with not-updated values (set in ngOnInit).
     */
    ngOnChanges() {
        if (this.form) {
            this.form.patchValue({
                'task_id': this.task.id,
                'body': this.question.body
            });
        }
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }
}
