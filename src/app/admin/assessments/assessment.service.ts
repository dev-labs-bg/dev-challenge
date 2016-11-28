import { Injectable } from '@angular/core';

import { Repository } from '../../core/repository';
import { HttpService } from '../../services/http.service';
import { Assessment } from './assessment';

@Injectable()
export class AssessmentService {
    public repository: Repository = new Repository();
    public apiGetURLS = {
        all: this.httpService.get('assessment-types/all'),
    };

    constructor(
        private httpService: HttpService
    ) { }

    setup() {
        return this.repository.setup(
            this.apiGetURLS.all,
            Assessment
        );
    }

    /**
     * Get assessmentTypes var
     *
     * @returns {any}
     */
    getAssessmentTypes() {
        // TODO: Find out why this doesn't work!
        this.repository.getData();
    }

}
