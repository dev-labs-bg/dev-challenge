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
import {TODO_STATUSES} from '../../../assessment/constants';
import {TodoService} from '../../../todos/todo.service';
import {UserService} from '../../../shared/user.service';
import {AuthService} from '../../../core/auth.service';

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
    private TODO_STATUSES = TODO_STATUSES;

    constructor(
        private activatedRoute: ActivatedRoute,
        private httpService: HttpService,
        private submissionService: SubmissionService,
        private notificationService: NotificationService,
        private router: Router,
        private todoService: TodoService,
        private userService: UserService,
        private authService: AuthService,
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

    /**
     * Approve a submission
     * 
     * @param {Submission} id
     * @returns {null}
     */
    approve(id) {
        let confirmation = `Are you sure you want to approve this submission?`;

        if (confirm(confirmation)) {

            this.submissionService.approve(id).subscribe(
                response => {
                    this.resetData();
                    this.notificationService.fireSuccess('Submission approved!');
                    this.router.navigate(['admin/submissions/' + this.task.category.getId()]);
                }
            );

        }
    }

    /**
     * Deny a submission
     * 
     * @param {Submission} id
     * @returns {null}
     */
    deny(id) {
        let confirmation = `Are you sure you want to deny this submission?`;

        if (confirm(confirmation)) {

            this.submissionService.deny(id).subscribe(
                response => {
                    this.resetData();
                    this.notificationService.fireSuccess('Submission denied!');
                    this.router.navigate(['admin/submissions/' + this.task.category.getId()]);
                }
            );
        }
    }

    /**
     * Reset dashboard data
     * We need to reset it, otherwise it don't get updated
     *
     * @returns {null}
     */
    resetData() {
        // reset user data
        this.submissionService.setSubmissions([]);

        // reset todos
        this.todoService.reset();

        // get user's experience
        this.userService.getLoggedUser().subscribe(
            response => this.authService.setLoggedUser(response.user)
        )
    }
}
