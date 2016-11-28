import { Component, Input } from '@angular/core';

import { Assessment } from '../assessment';

@Component({
    selector: 'xp-assessment-micro-project',
    template: `
        <h2>Assessment: Complete a micro-project</h2>
        <p>{{ assessment.description }}</p>
        <xp-assessment-micro-project-form
            (onSubmit)="submitAssessment($event)">
        </xp-assessment-micro-project-form>
    `
})
export class AssessmentMicroProjectComponent {
    @Input() private assessment: Assessment;

    constructor() { }

    private submitAssessment() {
        // TODO: API call.
    }

}
