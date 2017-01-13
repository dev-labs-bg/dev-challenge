import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {Submission} from '../submission';
import {Task} from '../../tasks/task';
import {Question} from '../../assessments/question';
import {User} from '../../../classes/user';
import {HttpService} from '../../../services/http.service';
import {SubmissionService} from '../submission.service';
import {NotificationService} from '../../../shared/notification.service';
import {ASSESSMENT_OPEN_ANSWER_TYPES} from '../../../assessment/constants';

@Component({
    selector: 'xp-single',
    templateUrl: './single.component.html',
    styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit, OnDestroy {
    private routeSubscription: Subscription;
    private submission: Submission = null;
    private task: Task = null;
    private user: User = null;
    private question: Question = null;
    private answer = [];
    private ASSESSMENT_OPEN_ANSWER_TYPES = ASSESSMENT_OPEN_ANSWER_TYPES;

    constructor(
        private activatedRoute: ActivatedRoute,
        private httpService: HttpService,
        private submissionService: SubmissionService,
        private notificationService: NotificationService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.routeSubscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                new Promise(
                    resolve => {
                        this.httpService.get('submission/' + param['id']).subscribe(
                            response => {
                                this.submission = Submission.newSubmission(response.submission);
                                this.task = Task.newInstance(response.task);
                                this.user = User.newInstance(response.user);
                                this.question = Question.newInstance(response.question);
                                this.answer = response.answer;
                                resolve(response.success);
                            },
                            error => console.log('Ah, submission was not found')
                        );
                    }
                );
            }
        );
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    approve(id) {
        this.submissionService.approve(id).subscribe(
            response => {
                this.notificationService.fireSuccess('Submission approved!');
                this.router.navigate(['admin/submissions']);
            }
        );
    }

    deny(id) {
        this.submissionService.deny(id).subscribe(
            response => {
                this.notificationService.fireSuccess('Submission denied!');
                this.router.navigate(['admin/submissions']);
            }
        );
    }
}
