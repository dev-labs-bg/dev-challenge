import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { AssessmentService } from './assessment.service';

@Component({
    selector: 'xp-admin-assessments-list',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <div class="form-group" [formGroup]="form">
                <label [attr.for]="name">Select Assessment Type</label>
                <select
                    class="form-control"
                    name="{{ name }}"
                    id="{{ name }}"
                    formControlName="{{ name }}">
                    <option value="" disabled>Please choose</option>
                    <option
                        *ngFor="let assessment of assessmentService.repository.getData()"
                        value="{{ assessment.id }}">
                        {{ assessment.type }}
                    </option>
                </select>
            </div>
        </xp-loading-indicator>
    `
})
export class AdminAssessmentsListComponent implements OnInit {
    @Input() private name: string;
    @Input() private form: FormGroup;
    private subscription: Subscription;

    constructor(private assessmentService: AssessmentService) { }

    ngOnInit() {
        this.subscription = this.assessmentService.setup();
    }

}
