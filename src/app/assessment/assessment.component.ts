import { Component, Input } from '@angular/core';

import { ASSESSMENT_TYPES } from './constants';
import { Assessment } from './assessment';

@Component({
    selector: 'xp-assessment',
    template: `
        <button
            class="btn btn-primary"
            (click)="toggleOpen()">
            {{ isOpen ? 'close' : 'open' }} assessment
        </button>
        <div *ngIf="isOpen" [ngSwitch]="assessment.type">
            <xp-assessment-micro-project
                *ngSwitchCase="ASSESSMENT_TYPES.MICRO_PROJECT">
            </xp-assessment-micro-project>
        </div>
    `,
    styles: []
})
export class AssessmentComponent {
    @Input() private assessment: Assessment;
    private ASSESSMENT_TYPES = ASSESSMENT_TYPES;
    private isOpen: boolean = true;

    constructor() { }

    private toggleOpen() {
        this.isOpen = ! this.isOpen;
    }

}
