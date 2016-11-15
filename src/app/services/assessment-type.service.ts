import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { AssessmentType } from "../classes/assessment-type";
import { Subscription } from "rxjs/Rx";

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
                if (response.success) {
                    this.assessmentTypes = response.assessmentTypes.map(
                        el => new AssessmentType(
                            el.id,
                            el.type
                        )
                    )
                }
            }
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
