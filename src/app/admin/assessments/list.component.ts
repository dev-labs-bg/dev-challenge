import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AssessmentTypeService } from '../tasks/assessment-type.service';

@Component({
    selector: 'xp-admin-assessments-list',
    template: `
        <div class="form-group" [formGroup]="form">
            <label [attr.for]="name">Select Assessment Type</label>
            <select
                name="{{ name }}"
                id="{{ name }}"
                formControlName="{{ name }}">
                <option value="" disabled>Please choose</option>
                <option
                    *ngFor="let type of assessmentTypeService.getAssessmentTypes()"
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

    constructor(private assessmentTypeService: AssessmentTypeService) { }

    ngOnInit() {
        this.assessmentTypeService.getAll();
    }

}
