import { Component, Input } from '@angular/core';

import { Todo } from '../../todos/todo';
import { AssessmentService } from '../assessment.service';

@Component({
    selector: 'xp-assessment-exam-create',
    template: `
        <div [ngSwitch]="mode">

            <div *ngSwitchCase="modes.IN_PROGRESS">
                <div *ngFor="let question of todo.task.questions; let i = index">
                    <p>Question {{ i }} out of {{ questionsCount }}</p>
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
export class AssessmentExamCreateComponent {
    @Input() private todo: Todo;
    private currentQuestionIndex: number = 0;
    // TODO: Find out why this doesn't work
    private questionsCount: number = this.todo ? this.todo.task.questions.length : 0;
    private modes = {
        IN_PROGRESS: 'IN PROGRESS',
        DONE: 'DONE'
    };
    private mode = this.modes.IN_PROGRESS;

    constructor(private assessmentService: AssessmentService) { }

    handleNext() {
        // TODO: Find out why this doesn't work
        if (this.currentQuestionIndex > this.questionsCount) {
            this.mode = this.modes.DONE;

            return;
        }

        this.currentQuestionIndex++;
    }

}
