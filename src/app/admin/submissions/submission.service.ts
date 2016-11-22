import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Subscription} from 'rxjs/Rx';
import {Submission} from './submission';

@Injectable()
export class SubmissionService {
    private submissions: Submission[] = [];

    constructor(
        private httpService: HttpService
    ) { }

    getAll(): Submission[] | Subscription {
        if (this.submissions.length > 0) {
            return this.submissions;
        }

        return this.httpService.get('submissions/all').subscribe(
            response => this.submissions = response.submissions.map(
                el => new Submission(
                    el.id,
                    el.task_id,
                    el.user_id,
                    el.finished,
                    el.approved
                )
            )
        );
    }

    getSubmissions() {
        return this.submissions;
    }

}
