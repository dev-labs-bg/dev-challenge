import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AssessmentService } from './assessment.service';

@Component({
    selector: 'xp-admin-assessments-list',
    template: `
        <div class="form-group" [formGroup]="form">
            <label [attr.for]="name">Select Assessment Type</label>
            <select
                class="form-control"
                name="{{ name }}"
                id="{{ name }}"
                formControlName="{{ name }}">
                <option value="" disabled>Please choose</option>
                <option
                    *ngFor="let type of assessmentService.getAssessmentTypes()"
                    value="{{ type.id }}">
                    {{ type.type }}
                </option>
            </select>
        </div>
    `
})
export class AdminAssessmentsListComponent implements OnInit {
    @Input() private name: string;
    @Input() private form: FormGroup;

    constructor(private assessmentService: AssessmentService) { }

    ngOnInit() {
        this.assessmentService.getAll();
    }

}
