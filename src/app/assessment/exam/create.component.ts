import { Component, OnChanges, Input, ViewChild } from '@angular/core';

import { Todo } from '../../todos/todo';
import { AssessmentService } from '../assessment.service';
import { Modal } from '../../shared/modal.component';

@Component({
    selector: 'xp-assessment-exam-create',
    template: `
        <div [ngSwitch]="mode">

            <div *ngSwitchCase="modes.GET_READY">
                <button
                    (click)="startExam()"
                    class="btn btn-success">
                    Start Exam!
                </button>
            </div>

            <xp-modal
                title="Exam"
                (onShow)="toggleMode(modes.IN_PROGRESS)"
                (onHide)="toggleMode(modes.GET_READY)">
                <div *ngFor="let question of todo.task.questions; let i = index">
                    <xp-assessment-exam-form-item
                        *ngIf="currentQuestionIndex === i"
                        [questionNumber]="i + 1"
                        [questionsCount]="questionsCount"
                        [todoId]="todo.assessment.todoId"
                        [questionId]="todo.assessment.questionId"
                        [question]="question"
                        (onNext)="handleNext($event)">
                    </xp-assessment-exam-form-item>
                </div>
            </xp-modal>

            <div *ngSwitchCase="modes.DONE">
                <div [ngSwitch]="areAllAnswersCorrect()">
                    <p *ngSwitchCase="true" class="alert alert-success">
                        <strong>Perfect! {{ correctAnswers }} correct answers
                        out of {{ questionsCount }} questions!</strong><br />
                        Exam completed successfully!
                    </p>
                    <p *ngSwitchCase="false" class="alert alert-warning">
                        <strong>Ah! {{ correctAnswers }} correct answers
                        out of {{ questionsCount }} questions!</strong>
                        <br />

                        In order to complete successfully the exam, you must answer correctly all questions.
                        <a href="https://www.ted.com/talks/sal_khan_let_s_teach_for_mastery_not_test_scores" target="_blank">
                            Here's why.
                        </a>
                        <br />

                        PS: You can re-take the exam unlimited times.
                    </p>

            </div>
        </div>
    `,
    styles: []
})
export class AssessmentExamCreateComponent implements OnChanges {
    @Input() private todo: Todo;
    @ViewChild(Modal) private modal: Modal;

    private currentQuestionIndex: number = 0;
    private questionsCount: number;
    private correctAnswers: number = 0;
    private modes = {
        GET_READY: 'GET_READY',
        IN_PROGRESS: 'IN PROGRESS',
        DONE: 'DONE'
    };
    private mode = this.modes.GET_READY;

    constructor(private assessmentService: AssessmentService) { }

    ngOnChanges() {
        this.questionsCount = this.todo ? this.todo.task.questions.length : 0;
    }

    startExam() {
        this.modal.show();
    }

    toggleMode(nextMode) {
        this.mode = nextMode;
    }

    handleNext(isAnswerCorrect) {
        this.currentQuestionIndex++;

        if (isAnswerCorrect) {
            this.correctAnswers++;
        }

        /**
         * Check if this was the last question in the exam,
         * if so - no more questions to come. Exam is completed!
         */
        const isQuestionsLimitReached = this.currentQuestionIndex === this.questionsCount;
        if (isQuestionsLimitReached) {
            this.modal.hide();
            this.toggleMode(this.modes.DONE);

            return;
        }
    }

    areAllAnswersCorrect() {
        return this.correctAnswers === this.questionsCount;
    }

}
