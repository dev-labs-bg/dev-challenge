import { Component, Input } from '@angular/core';

import { Assessment } from '../assessment';

@Component({
    selector: 'xp-assessment-micro-project',
    template: `
        <h2>Assessment: Complete a micro-project</h2>
        <p>{{ assessment.description }}</p>
        <xp-create-micro-project-assessment
            [assessment]="assessment">
        </xp-create-micro-project-assessment>
    `
})
export class AssessmentMicroProjectComponent {
    @Input() private assessment: Assessment;

    constructor() { }

}
