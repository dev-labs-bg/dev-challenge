import {Component, Input, OnInit} from '@angular/core';

import { Assessment } from '../assessment';
import { Todo } from '../../todos/todo';
import { TODO_STATUSES } from '../constants';

@Component({
    selector: 'xp-assessment-micro-project',
    template: `
        <h2>Assessment: Complete a micro-project</h2>
        <p>{{ assessment.description }}</p>

        <div [ngSwitch]="todo.status">
            <xp-create-micro-project-assessment
                *ngSwitchCase="TODO_STATUSES.UNCOMPLETED"
                [assessment]="assessment">
            </xp-create-micro-project-assessment>
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
export class AssessmentMicroProjectComponent implements OnInit {
    @Input() private assessment: Assessment;
    @Input() private todo: Todo;
    private TODO_STATUSES = TODO_STATUSES;

    constructor() { }

    ngOnInit() {
        //
    }

}
