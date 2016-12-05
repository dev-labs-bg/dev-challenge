import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

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
            <div *ngSwitchCase="modes.CORRECT_ANSWER" class="alert alert-success">
                Correct answer!<br />
                {{ whyCorrect }}
            </div>
            <div *ngSwitchCase="modes.WRONG_ANSWER" class="alert alert-danger">
                Wrong answer!<br />
                {{ whyCorrect }}
            </div>
        </div>
    `,
    styles: []
})
export class AssessmentExamFormItemComponent implements OnInit {
    @Input() private todoId;
    @Input() private questionId;
    @Input() private question;
    //@Output() onSubmit = new EventEmitter();
    private whyCorrect: string;
    private modes = {
        CHOOSE_ANSWER: 0,
        CORRECT_ANSWER: 1,
        WRONG_ANSWER: 2
    };
    private mode = this.modes.CHOOSE_ANSWER;

    constructor() { }

    ngOnInit() {
        /**
         * Out of all the answers,
         * only the correct answer has `why_correct` explanation.
         * Find the correct answer and get the explanation, so then we can display it.
         */
        const correctAnswer = _.find(this.question.answers, item => item.is_correct);
        this.whyCorrect = correctAnswer.why_correct;
    }

    handleAnswerSubmit(answer) {
        const answerId = answer.id;
        console.log('todoId', this.todoId);
        console.log('questionId', this.questionId);
        console.log('answerId', answerId);

        if (answer.is_correct) {
            this.mode = this.modes.CORRECT_ANSWER;
        } else {
            this.mode = this.modes.WRONG_ANSWER;
        }

        //this.onSubmit.emit(this.question);
        // this.assessmentService.submitExamAnswer(todoId, questionId, answerId);
    }

}
