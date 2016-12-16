import { Component, OnInit, Input } from '@angular/core';

import { TODO_STATUSES } from '../constants';
import { Todo } from '../../todos/todo';

@Component({
    selector: 'xp-assessment-exam',
    template: `
        <h5>Assessment: Exam</h5>

        <div [ngSwitch]="todo.status">
            <p class="mb">
                PS: No worries. You can re-take the exam unlimited times.
            </p>
            <xp-assessment-exam-create
                *ngSwitchCase="TODO_STATUSES.UNCOMPLETED"
                [todo]="todo">
            </xp-assessment-exam-create>

            <div *ngSwitchCase="TODO_STATUSES.COMPLETED">
                <div class="alert alert-success" role="alert">
                    Exam completed successfully!
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class AssessmentExamComponent implements OnInit {
    @Input() private todo: Todo;
    private TODO_STATUSES = TODO_STATUSES;

    constructor() { }

    ngOnInit() {
    }

}
