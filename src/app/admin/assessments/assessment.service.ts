import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { HttpService } from '../../services/http.service';
import { AssessmentType } from '../tasks/assessment-type';

@Injectable()
export class AssessmentService {
    private assessmentTypes;

    constructor(
        private httpService: HttpService
    ) { }

    /**
     * Get all assessment types
     *
     * @returns {Subscription}
     */
    getAll(): Subscription | AssessmentType[] {
        let assessmentTypes = this.getAssessmentTypes();

        if (assessmentTypes != null) {
            return assessmentTypes;
        }

        return this.httpService.get('assessment-types/all').subscribe(
            response => {
                this.assessmentTypes = response.assessmentTypes.map(
                    el => new AssessmentType(
                        el.id,
                        el.type
                    )
                );
            },
            error => console.log('Ah, Could not get the assessment types!', error)
        );
    }

    /**
     * Get assessmentTypes var
     *
     * @returns {any}
     */
    getAssessmentTypes() {
        return this.assessmentTypes;
    }

}