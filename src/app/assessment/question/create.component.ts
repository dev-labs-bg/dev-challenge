import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'xp-assessment-question-create',
    template: `
        <xp-assessment-form-open-question
            (onSubmit)="handleSubmit($event)">
        </xp-assessment-form-open-question>
    `,
    styles: []
})
export class AssessmentQuestionCreateComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    handleSubmit() {
        // TODO: Create!
    }

}
