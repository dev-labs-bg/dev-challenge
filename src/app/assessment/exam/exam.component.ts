import { Component, OnInit, Input } from '@angular/core';

import { TODO_STATUSES } from '../constants';
import { Todo } from '../../todos/todo';

@Component({
    selector: 'xp-assessment-exam',
    template: `
        <h2>Assessment: Exam</h2>

        <div [ngSwitch]="todo.status">
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
