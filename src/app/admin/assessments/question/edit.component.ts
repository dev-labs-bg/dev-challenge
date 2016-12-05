import { Component, Input } from '@angular/core';

import { Task } from '../../tasks/task';
import { Question } from '../question';

/**
 * Question edit is the same as micro-project edit,
 * they share the same data structure and they hit the same API endpoints.
 *
 * Therefore, the <xp-admin-assessments-micro-project-edit> is re-used here.
 */
@Component({
    selector: 'xp-admin-assessments-question-edit',
    template: `
        <xp-admin-assessments-micro-project-edit
            [task]="task"
            [question]="question">
        </xp-admin-assessments-micro-project-edit>
    `
})
export class AdminAssessmentsQuestionEditComponent {
    @Input() private task: Task;
    @Input() private question: Question;

    constructor() { }

}
