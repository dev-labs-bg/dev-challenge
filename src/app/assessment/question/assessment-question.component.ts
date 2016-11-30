import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../../todos/todo';
import { TODO_STATUSES } from '../constants';

@Component({
    selector: 'xp-assessment-question',
    template: `
        <h2>Assessment: Answer a Question</h2>
        <p>{{ todo.assessment.description }}</p>

        <div [ngSwitch]="todo.status">
            <xp-assessment-question-create
                *ngSwitchCase="TODO_STATUSES.UNCOMPLETED"
                [assessment]="todo.assessment">
            </xp-assessment-question-create>

            <div *ngSwitchCase="TODO_STATUSES.SUBMITTED_FOR_REVIEW">
                <h3>Your submission</h3>
                <div class="alert alert-info" role="alert">
                    {{ todo.submissions[todo.submissions.length - 1].body }}
                </div>
            </div>

            <div *ngSwitchCase="TODO_STATUSES.COMPLETED">
                <h3>Your submission</h3>
                <div class="alert alert-success" role="alert">
                    {{ todo.submissions[todo.submissions.length - 1].body }}
                </div>
            </div>
        </div>
    `
})
export class AssessmentQuestionComponent implements OnInit {
    @Input() private todo: Todo;
    private TODO_STATUSES = TODO_STATUSES;

    constructor() { }

    ngOnInit() {
    }

}
