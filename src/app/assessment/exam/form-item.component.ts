import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'xp-assessment-exam-form-item',
    template: `
        <h2>{{ question.body }}</h2>
        <button
            *ngFor="let answer of question.answers"
            (click)="handleAnswerSubmit(answer)"
            [disabled]="mode !== modes.CHOOSE_ANSWER"
            type="button"
            class="btn btn-default">
            {{ answer.body }}
        </button>

        <div [ngSwitch]="mode">
            <div *ngSwitchCase="modes.CORRECT_ANSWER">
                Correct answer!
            </div>
            <div *ngSwitchCase="modes.WRONG_ANSWER">
                Wrong answer!
            </div>
        </div>
    `,
    styles: []
})
export class AssessmentExamFormItemComponent implements OnInit {
    @Input() private todoId;
    @Input() private questionId;
    @Input() private question;
    private modes = {
        CHOOSE_ANSWER: 0,
        CORRECT_ANSWER: 1,
        WRONG_ANSWER: 2
    };
    private mode = this.modes.CHOOSE_ANSWER;

    constructor() { }

    ngOnInit() {
    }

    handleAnswerSubmit(answer) {
        const answerId = answer.id;
        console.log('todoId', this.todoId);
        console.log('questionId', this.questionId);
        console.log('answerId', answerId);

        const isCorrectAnswer = !! answer.is_correct;

        if (isCorrectAnswer) {
            this.mode = this.modes.CORRECT_ANSWER;
        } else {
            this.mode = this.modes.WRONG_ANSWER;
        }

        // this.assessmentService.submitExamAnswer(todoId, questionId, answerId);
    }

}
