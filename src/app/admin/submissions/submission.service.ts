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

    /**
     * Set submissions var
     * 
     * @param {Submission} submissions
     */
    setSubmissions(submissions) {
        return this.submissions = submissions;
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

    deny(id) {
        return this.httpService.post('submission/' + id + '/deny');
    }

    /**
     * Find submissions by user
     * 
     * @param {int} user_id
     */
    findByUser(user_id) {
        let submissions: Submission[] = [];
        let userId = parseInt(user_id, 10);

        _.forEach(this.getSubmissions(),
            submission => {
                if (submission.user_id === userId && 
                    submission.task.assessment_type_id != 2) {
                    submissions.push(submission);
                }
            }
        );

        return submissions;
    }

}
