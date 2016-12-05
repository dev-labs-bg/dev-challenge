import {Component, Input, OnInit} from '@angular/core';

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

        <div *ngIf="isOpen" [ngSwitch]="assessment.id">
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
        </div>
    `
})
export class AssessmentComponent implements OnInit {
    @Input() private assessment: Assessment;
    @Input() private todo: Todo;
    private ASSESSMENT_TYPES = ASSESSMENT_TYPES;
    private isOpen: boolean = true;

    constructor() { }

    private toggleOpen() {
        this.isOpen = ! this.isOpen;
    }

    ngOnInit() {
    }

}
