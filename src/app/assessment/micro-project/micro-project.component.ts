import {Component, Input, OnInit} from '@angular/core';

import { Assessment } from '../assessment';
import { Todo } from '../../todos/todo';
import { TODO_STATUSES } from '../constants';

@Component({
    selector: 'xp-assessment-micro-project',
    template: `
        <h5>Assessment: Complete a micro-project</h5>
        <pre class="line-break-pre">{{ assessment.description }}</pre>

        <div [ngSwitch]="todo.status">
            <xp-create-micro-project-assessment
                *ngSwitchCase="TODO_STATUSES.UNCOMPLETED"
                [assessment]="assessment">
            </xp-create-micro-project-assessment>

            <div *ngSwitchCase="TODO_STATUSES.SUBMITTED_FOR_REVIEW">
                <h3>Your submission</h3>
                <div class="alert alert-info" role="alert">
                    <pre class="line-break-pre">{{ todo.submissions[todo.submissions.length - 1].body }}</pre>
                </div>
            </div>

            <div *ngSwitchCase="TODO_STATUSES.DENIED">
                <h3>Sadly, your submission was denied :(</h3>
                <div class="alert alert-danger" role="alert">
                    <pre class="line-break-pre">{{ todo.submissions[todo.submissions.length - 1].body }}</pre>
                </div>
            </div>

            <div *ngSwitchCase="TODO_STATUSES.COMPLETED">
                <h3>Good job!</h3>
                <div class="alert alert-success" role="alert">
                    <pre class="line-break-pre">{{ todo.submissions[todo.submissions.length - 1].body }}</pre>
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
