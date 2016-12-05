import { Component, Input } from '@angular/core';

import { Task } from '../../tasks/task';

/**
 * Question create is the same as micro-project create,
 * they share the same data structure and they hit the same API endpoints.
 *
 * Therefore, the <xp-admin-assessments-micro-project-create> is re-used here.
 */
@Component({
    selector: 'xp-admin-assessments-question-create',
    template: `
        <xp-admin-assessments-micro-project-create
            [task]="task">
        </xp-admin-assessments-micro-project-create>
    `
})
export class AdminAssessmentsQuestionCreateComponent {
    @Input() private task: Task;

    constructor() { }

}
