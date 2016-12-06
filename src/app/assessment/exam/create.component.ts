import { Component, OnChanges, Input } from '@angular/core';

import { Todo } from '../../todos/todo';
import { AssessmentService } from '../assessment.service';

@Component({
    selector: 'xp-assessment-exam-create',
    template: `
        <div [ngSwitch]="mode">

            <div *ngSwitchCase="modes.IN_PROGRESS">

                <div *ngFor="let question of todo.task.questions; let i = index">
                    <p *ngIf="currentQuestionIndex === i">
                        Question {{ i + 1 }} out of {{ questionsCount }}
                    </p>
                    <xp-assessment-exam-form-item
                        *ngIf="currentQuestionIndex === i"
                        [todoId]="todo.assessment.todoId"
                        [questionId]="todo.assessment.questionId"
                        [question]="question">
                    </xp-assessment-exam-form-item>
                </div>
                <button (click)="handleNext()" class="btn btn-primary">
                    Next!
                </button>
            </div>

            <div *ngSwitchCase="modes.DONE">
                Exam completed!
            </div>
        </div>
    `,
    styles: []
})
export class AssessmentExamCreateComponent implements OnChanges {
    @Input() private todo: Todo;
    private currentQuestionIndex: number = 0;
    private questionsCount: number;
    private modes = {
        IN_PROGRESS: 'IN PROGRESS',
        DONE: 'DONE'
    };
    private mode = this.modes.IN_PROGRESS;

    constructor(private assessmentService: AssessmentService) { }

    ngOnChanges() {
        this.questionsCount = this.todo ? this.todo.task.questions.length : 0;
    }

    handleNext() {
        this.currentQuestionIndex++;

        /**
         * Check if this was the last question in the exam,
         * if so - no more questions to come. Exam is completed!
         */
        const isQuestionsLimitReached = this.currentQuestionIndex === this.questionsCount;
        if (isQuestionsLimitReached) {
            this.mode = this.modes.DONE;

            return;
        }
    }

}
