import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {Submission} from '../submission';
import {SubmissionService} from '../submission.service';

@Component({
  selector: 'xp-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit, OnDestroy {
    private routeSubscription: Subscription;
    private submission: Submission = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private submissionService: SubmissionService,
    ) { }

    ngOnInit() {
        let submissions = this.submissionService.getSubmissions();

        if (submissions.length === 0) {
            this.submissionService.getAll();

            this.routeSubscription = this.submissionService.submissionsChange.subscribe(
                data => this.routeInitSpecifics()
            );
        } else {
            this.routeSubscription = this.routeInitSpecifics();
        }
    }

    routeInitSpecifics() {
        return this.activatedRoute.params.subscribe(
            (param: any) => this.submission = this.submissionService.getById(param['id'])
        );
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
