import {Injectable, EventEmitter} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Subscription} from 'rxjs/Rx';
import {Submission} from './submission';
import * as _ from 'lodash';

@Injectable()
export class SubmissionService {
    private submissions: Submission[] = [];
    public submissionsChange: EventEmitter<Submission[]> = new EventEmitter<Submission[]>();

    constructor(
        private httpService: HttpService
    ) { }

    getAll(): Submission[] | Subscription {
        if (this.submissions.length > 0) {
            return this.submissions;
        }

        return this.httpService.get('submission/all').subscribe(
            response => {
                this.submissions = response.submissions.map(
                    el => Submission.newSubmission(el)
                );

                this.submissionsChange.emit(this.submissions);
            }
        );
    }

    getSubmissions() {
        return this.submissions;
    }

    getById(id) {
        let submissionId = parseInt(id, 10);

        const foundSubmission = _.find(this.submissions,
            submission => submission.id === submissionId
        );

        return foundSubmission;
    }

    approve(id) {
        return this.httpService.post('submission/' + id + '/approve');
    }


}
