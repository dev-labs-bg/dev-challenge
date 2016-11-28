import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { HttpService } from '../../services/http.service';
import { Assessment } from './assessment';

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
    getAll(): Subscription | Assessment[] {
        let assessmentTypes = this.getAssessmentTypes();

        if (assessmentTypes != null) {
            return assessmentTypes;
        }

        return this.httpService.get('assessment-types/all').subscribe(
            response => {
                this.assessmentTypes = response.assessmentTypes.map(
                    el => new Assessment(
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
