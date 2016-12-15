import { Component, Input } from '@angular/core';

import { ASSESSMENT_TYPES } from './constants';
import { Assessment } from './assessment';
import { Todo } from '../todos/todo';

@Component({
    selector: 'xp-assessment',
    template: `
        <ng-container [ngSwitch]="assessment.id">
            <xp-assessment-micro-project
                *ngSwitchCase="ASSESSMENT_TYPES.MICRO_PROJECT"
                [assessment]="assessment"
                [todo]="todo">
            </xp-assessment-micro-project>

            <xp-assessment-question
                *ngSwitchCase="ASSESSMENT_TYPES.QUESTION"
                [todo]="todo">
            </xp-assessment-question>

            <xp-assessment-exam
                *ngSwitchCase="ASSESSMENT_TYPES.EXAM"
                [todo]="todo">
            </xp-assessment-exam>
        </ng-container>
    `
})
export class AssessmentComponent {
    @Input() private assessment: Assessment;
    @Input() private todo: Todo;
    private ASSESSMENT_TYPES = ASSESSMENT_TYPES;

    constructor() { }

}
