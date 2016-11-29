import { Component, Input } from '@angular/core';

import { ASSESSMENT_TYPES } from './constants';
import { Assessment } from './assessment';
import { Todo } from '../todos/todo';

@Component({
    selector: 'xp-assessment',
    template: `
        <button
            class="btn btn-primary"
            (click)="toggleOpen()">
            {{ isOpen ? 'close' : 'open' }} assessment
        </button>
        <div *ngIf="isOpen" [ngSwitch]="assessment.type">

            <div *ngSwitchCase="ASSESSMENT_TYPES.MICRO_PROJECT.id">
                <xp-assessment-micro-project
                    [assessment]="assessment"
                    [todo]="todo">
                </xp-assessment-micro-project>
            </div>
            <xp-assessment-question
                *ngSwitchCase="ASSESSMENT_TYPES.QUESTION.id">
            </xp-assessment-question>

        </div>
    `
})
export class AssessmentComponent {
    @Input() private assessment: Assessment;
    @Input() private todo: Todo;
    private ASSESSMENT_TYPES = ASSESSMENT_TYPES;
    private isOpen: boolean = true;

    constructor() { }

    private toggleOpen() {
        this.isOpen = ! this.isOpen;
    }

}
