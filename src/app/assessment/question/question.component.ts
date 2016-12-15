import { Component, OnChanges, Input } from '@angular/core';

import { Todo } from '../../todos/todo';
import { TODO_STATUSES, ASSESSMENT_OPEN_ANSWER_TYPES } from '../constants';

@Component({
    selector: 'xp-assessment-question',
    template: `
        <h5>Assessment: Answer a Question</h5>
        <p>{{ todo.assessment.description }}</p>

        <div [ngSwitch]="todo.status">
            <xp-assessment-question-create
                *ngSwitchCase="TODO_STATUSES.UNCOMPLETED"
                [assessment]="todo.assessment">
            </xp-assessment-question-create>

            <div *ngSwitchCase="TODO_STATUSES.SUBMITTED_FOR_REVIEW">
                <h3>Your submission</h3>

                <div [ngSwitch]="submission.type"
                    class="alert alert-info" role="alert">
                    <div *ngSwitchCase="ASSESSMENT_OPEN_ANSWER_TYPES.TEXT">
                        {{ submission.body }}
                    </div>

                    <div *ngSwitchCase="ASSESSMENT_OPEN_ANSWER_TYPES.AUDIO">
                        <xp-audio-player
                            [source]="submission.body">
                        </xp-audio-player>
                    </div>
                </div>

            </div>

            <div *ngSwitchCase="TODO_STATUSES.COMPLETED">
                <h3>Your submission</h3>
                <div class="alert alert-success" role="alert">
                    {{ submission.body }}
                </div>
            </div>
        </div>
    `
})
export class AssessmentQuestionComponent implements OnChanges {
    @Input() private todo: Todo;
    private TODO_STATUSES = TODO_STATUSES;
    private ASSESSMENT_OPEN_ANSWER_TYPES = ASSESSMENT_OPEN_ANSWER_TYPES;
    private submission;

    constructor() { }

    ngOnChanges() {
        // Always use the latest submission
        this.submission = this.todo ? this.todo.submissions[this.todo.submissions.length - 1] : {};
    }

}
