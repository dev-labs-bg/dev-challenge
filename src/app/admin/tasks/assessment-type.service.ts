import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AssessmentType } from './assessment-type';
import { Subscription } from 'rxjs/Rx';

@Injectable()
export class AssessmentTypeService {
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
                this.assessmentTypes = response.data.map(
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
