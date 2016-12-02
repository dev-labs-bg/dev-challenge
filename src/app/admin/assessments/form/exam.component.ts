import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Question } from '../question';
import { Task } from '../../tasks/task';
import { QuestionService } from '../question.service';

@Component({
    selector: 'xp-admin-assessment-form-exam',
    template: `
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div
                class="question-group-holder"
                *ngFor="let question of formQuestions.controls; let i = index;">
                <div
                    class="form-group"
                    formArrayName="formQuestions">
                    <div [formGroupName]="i">
                        <input
                            formControlName="id"
                            type="hidden"
                        >
                        <label>
                            <span>Question #{{ i + 1 }}</span>
                            <input
                                type="text"
                                class="form-control"
                                formControlName="body"
                            />
                        </label>
                    </div>
                </div>
                <div
                    class="holder">
                    <div
                        class="form-group"
                        formArrayName="correctAnswers">
                        <div [formGroupName]="i">
                            <input
                                type="hidden"
                                formControlName="id"
                            />
                            <label>
                                <span>Correct Answer</span>
                                <input
                                    type="text"
                                    class="form-control"
                                    formControlName="body"
                                />
                            </label>
                        </div>
                    </div>
                    <div
                        class="form-group"
                        formArrayName="correctAnswers">
                        <div [formGroupName]="i">
                            <label>
                                <span>Why is the answer correct?</span>
                                <input
                                    type="text"
                                    class="form-control"
                                    formControlName="explanation"
                                />
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <label class="col-lg-12">3 wrong answers</label>
                        </div>
                        <div
                            class="row"
                            formArrayName="wrongAnswers">
                            <div
                                *ngFor="let answer of form.controls.wrongAnswers.at(i).controls; let k = index;"
                                [formArrayName]="i"
                                class="col-lg-4">
                                <div [formGroupName]="k">
                                    <input
                                        type="hidden"
                                        formControlName="id"
                                    />
                                    <input
                                        type="text"
                                        class="form-control"
                                        formControlName="body"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div
                        class="btn btn-danger"
                        (click)="handleDelete(i)">
                        Delete question
                    </div>
                </div>
            </div>
            <button
                type="submit"
                class="btn btn-primary"
                [disabled]="!form.valid">
                Save form
            </button>
            <div
                class="btn btn-default"
                (click)="addQuestion()">
                Add question
            </div>
        </form>
    `
})
export class ExamAnswerFormComponent implements OnInit, OnChanges {
    @Input() private task: Task;
    @Input() private questions: Question[] = [];
    @Output() onSubmit = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    private form: FormGroup;

    constructor(
        private questionService: QuestionService,
        private formBuilder: FormBuilder
    ) { }

    /**
     * Init form on component init
     */
    ngOnInit() {
        let formQuestions = new FormArray([]);
        let correctAnswers = new FormArray([]);
        let wrongAnswers = new FormArray([]);

        let innerFormBuilder = this.formBuilder;

        this.questions.forEach(function (question) {
            formQuestions.push(
                innerFormBuilder.group({
                        id: [question.id],
                        body: [question.body, Validators.required],
                    }
                ));

            let wrongAnswersBody = new FormArray([]);

            question.examAnswers.forEach(function (answer) {
                if (answer.is_correct) {
                    correctAnswers.push(
                        innerFormBuilder.group({
                            id: [answer.id],
                            body: [answer.body, Validators.required],
                            explanation: [answer.why_correct, Validators.required],
                        })
                    );
                } else {
                    wrongAnswersBody.push(
                        innerFormBuilder.group({
                            id: [answer.id],
                            body: [answer.body, Validators.required]
                        })
                    );
                }
            });

            wrongAnswers.push(wrongAnswersBody);
        });

        // Init form
        this.form = this.formBuilder.group({
            'task_id': [this.task.id, Validators.required],
            'formQuestions': formQuestions,
            'correctAnswers': correctAnswers,
            'wrongAnswers': wrongAnswers,
        });

        // if form is empty, add a default empty question
        if (this.formQuestions.length === 0) {
            this.addQuestion();
        }
    }

    /**
     * Add a question to the form
     */
    addQuestion() {
        this.formQuestions.push(
            this.formBuilder.group({
                id: [''],
                body: ['', Validators.required],
            }
        ));
        this.wrongAnswers.push(
            new FormArray([
                this.formBuilder.group({
                    id: [''],
                    body: ['', Validators.required],
                }),
                this.formBuilder.group({
                    id: [''],
                    body: ['', Validators.required],
                }),
                this.formBuilder.group({
                    id: [''],
                    body: ['', Validators.required],
                })
            ])
        );
        this.correctAnswers.push(
            this.formBuilder.group({
                id: [''],
                body: ['', Validators.required],
                explanation: ['', Validators.required],
            })
        );
    }

    /**
     * Form var getters
     * Creates a variable called @varName (e.g. formQuestions)
     * and appends the return statement to it
     *
     * @returns {FormArray}
     */
    get formQuestions(): FormArray { return this.form.get('formQuestions') as FormArray; }

    get correctAnswers(): FormArray { return this.form.get('correctAnswers') as FormArray; }

    get wrongAnswers(): FormArray { return this.form.get('wrongAnswers') as FormArray; }

    /**
     * Build the exam form instance
     */
    buildExamForm() {
        let formQuestions = new FormArray([]);
        let correctAnswers = new FormArray([]);
        let wrongAnswers = new FormArray([]);

        let innerFormBuilder = this.formBuilder;

        this.questions.forEach(function (question) {
            formQuestions.push(
                innerFormBuilder.group({
                        id: [question.id],
                        body: [question.body, Validators.required],
                    }
                ));

            let wrongAnswersBody = new FormArray([]);

            question.examAnswers.forEach(function (answer) {
                if (answer.is_correct) {
                    correctAnswers.push(
                        innerFormBuilder.group({
                            id: [answer.id],
                            body: [answer.body, Validators.required],
                            explanation: [answer.why_correct, Validators.required],
                        })
                    );
                } else {
                    wrongAnswersBody.push(
                        innerFormBuilder.group({
                            id: [answer.id],
                            body: [answer.body, Validators.required]
                        })
                    );
                }
            });

            wrongAnswers.push(wrongAnswersBody);
        });

        // Init form
        this.form = this.formBuilder.group({
            'task_id': [this.task.id, Validators.required],
            'formQuestions': formQuestions,
            'correctAnswers': correctAnswers,
            'wrongAnswers': wrongAnswers,
        });

        // if form is empty, add a default empty question
        if (this.formQuestions.length === 0) {
            this.addQuestion();
        }
    }

    /**
     * Look for changes on @Input() task
     * and re init the form each time
     */
    ngOnChanges() {
        this.buildExamForm();
    }

    handleSubmit() {
        this.onSubmit.emit(this.form.value);
    }

    /**
     * Delete a question
     *
     * @param index - form group index
     */
    handleDelete(index) {
        let questionId = +this.formQuestions.at(index).value.id;

        // if there's no question id, just empty the fields
        if (! questionId || questionId === -1) {
            this.formQuestions.at(index).reset();
            this.correctAnswers.at(index).reset();
            this.wrongAnswers.at(index).reset();

            return;
        }

        this.onDelete.emit(questionId);
    }
}
