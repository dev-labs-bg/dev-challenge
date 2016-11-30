import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

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
                    class="btn btn-default">
                    Submit
                </button>
            </div>
        </form>
    `
})
export class AdminAssessmentOpenAnswerForm implements OnInit {
    @Input() private task: Task = new Task();
    @Output() onSubmit = new EventEmitter();
    private question: Question = new Question();
    private form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private questionService: QuestionService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            // TODO: default values here
            'task_id': [this.task.id, Validators.required],
            'body': [this.question.body, Validators.required]
        });
    }

    // /**
    //  * Init form
    //  */
    // ngOnInit() {
    //     this.form = this.buildForm();
    // }

    // /**
    //  * Recompile form on each @Input() task change;
    //  */
    // ngOnChanges() {
    //     this.form = this.buildForm();
    // }

    // /**
    //  * Build the form component
    //  *
    //  * @returns {FormGroup}
    //  */
    // buildForm() {
    //     // find questions related to task
    //     let questions = this.questionService.findByTaskId(this.task.id);

    //     // get the question
    //     this.question = (questions.length > 0) ? questions[0] : new Question();

    //     return this.formBuilder.group({
    //         'task_id': [this.task.id, Validators.required],
    //         'body': [this.question.body, Validators.required]
    //     });
    // }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

    /**
     * Handle form update
     *
     * @param id - question id
     */
    onUpdate(id) {
        let value = this.form.value;

        return this.questionService.update(id, value).subscribe(
            response => {
                if (response.success) {
                    this.questionService.updateMainArray(Question.newQuestion(response.question));
                } else {
                    console.log(response);
                }
            }
        );
    }

}
