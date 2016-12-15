import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'lodash';

import { Answer } from '../assessment';
import { AssessmentService } from '../assessment.service';

@Component({
    selector: 'xp-assessment-exam-form-item',
    template: `
        <p>
            Question {{ questionNumber }} out of {{ questionsCount }}
        </p>
        <h2>
            <pre class="line-break-pre">{{ question.body }}</pre>
        </h2>

        <xp-loading-indicator [wait]="subscription">
            <button
                *ngFor="let answer of question.answers"
                (click)="handleAnswerSubmit(answer)"
                [disabled]="isAnswerChosen()"
                type="button"
                class="btn btn-default"
                [ngClass]="{
                    'btn-success': showCorrectAnswer(answer),
                    'btn-primary': answer === chosenAnswer
                }">
                {{ answer.body }}
            </button>

            <div [ngSwitch]="mode">
                <div *ngSwitchCase="modes.CORRECT_ANSWER" class="alert alert-success">
                    Correct answer!<br />
                    <pre class="line-break-pre">{{ whyCorrect }}</pre>
                </div>
                <div *ngSwitchCase="modes.WRONG_ANSWER" class="alert alert-danger">
                    Wrong answer!<br />
                    <pre class="line-break-pre">{{ whyCorrect }}</pre>
                </div>
            </div>

            <button
                *ngIf="isAnswerChosen()"
                (click)="handleNext()"
                class="btn btn-primary">
                {{ isLastQuestion() ? 'Finish!' : 'Next!' }}
            </button>
        </xp-loading-indicator>
    `,
    styles: []
})
export class AssessmentExamFormItemComponent implements OnInit {
    @Input() private todoId;
    @Input() private questionId;
    @Input() private question;
    @Input() private questionNumber: number;
    @Input() private questionsCount: number;
    @Output() onNext = new EventEmitter();
    private chosenAnswer;
    private whyCorrect: string;
    private modes = {
        CHOOSE_ANSWER: 0,
        CORRECT_ANSWER: 1,
        WRONG_ANSWER: 2
    };
    private mode = this.modes.CHOOSE_ANSWER;
    private subscription: Subscription;

    constructor(private assessmentService: AssessmentService) { }

    ngOnInit() {
        /**
         * Out of all the answers,
         * only the correct answer has `why_correct` explanation.
         * Find the correct answer and get the explanation, so then we can display it.
         */
        const correctAnswer: Answer = _.find(this.question.answers,
            (item: Answer) => item.is_correct
        );
        this.whyCorrect = correctAnswer.why_correct;
    }

    handleAnswerSubmit(answer) {
        const answerId = answer.id;
        this.chosenAnswer = answer;

        this.subscription = this.assessmentService.submitOpenQuestionAnswer(
            this.todoId,
            this.questionId,
            answerId
        ).subscribe(
            response => {
                if (answer.is_correct) {
                    this.mode = this.modes.CORRECT_ANSWER;
                } else {
                    this.mode = this.modes.WRONG_ANSWER;
                }
            },
            error => console.log('Ah, assessment not submitted!', error)
        );
    }

    isAnswerChosen() {
        return this.mode !== this.modes.CHOOSE_ANSWER;
    }

    isLastQuestion() {
        return this.questionNumber === this.questionsCount;
    }

    /**
     * Display the correct answer,
     * but only if the user has made his choice
     */
    showCorrectAnswer(answer) {
        return answer.is_correct && this.mode !== this.modes.CHOOSE_ANSWER;
    }

    handleNext() {
        this.onNext.emit(this.chosenAnswer.is_correct);
    }
}
