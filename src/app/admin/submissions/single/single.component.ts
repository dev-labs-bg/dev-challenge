import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {Submission} from '../submission';
import {Task} from '../../tasks/task';
import {Question} from '../../assessments/question';
import {User} from '../../../classes/user';
import {HttpService} from '../../../services/http.service';

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

    constructor(
        private activatedRoute: ActivatedRoute,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.routeSubscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                new Promise(
                    resolve => {
                        this.httpService.get('submission/' + param['id']).subscribe(
                            response => {
                                this.submission = Submission.newSubmission(response.submission);
                                this.task = Task.newTask(response.submission.task);
                                this.user = User.newUser(response.submission.user);
                                resolve(response.success);
                            }
                        );
                    }
                );
            }
        );
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
