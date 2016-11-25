import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'xp-assessment-micro-project',
    template: `
        <h2>Assessment: Complete a micro-project</h2>
        <xp-assessment-micro-project-form
            (onSubmit)="submitAssessment($event)">
        </xp-assessment-micro-project-form>
    `,
    styles: []
})
export class AssessmentMicroProjectComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    private submitAssessment() {
        // TODO: API call.
    }

}
