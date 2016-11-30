import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import * as _ from 'lodash';

// 3rd party plugins
import {NotificationService} from "../../shared/notification.service";

import {User} from '../../classes/user';
import {HttpService} from '../../services/http.service';
import {ContributorsService} from '../../contributions/contributors.service';

@Component({
  selector: 'xp-bonus-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-group">
            <label for="points">Points</label>
            <input
                type="text"
                formControlName="points"
                class="form-control"
            />
        </div>
        <div class="form-group">
            <button
                class="btn btn-primary">
                Save points
            </button>
        </div>
    </form>
  `,
  styles: []
})
export class BonusFormComponent implements OnInit {
    @Input() user: User;
    @Input() bonusType: string;
    private form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        private notificationService: NotificationService,
        private contributorsService: ContributorsService
    ) { }

    ngOnInit() {
        let points = this.user.bonus_points[this.bonusType] ? this.user.bonus_points[this.bonusType] : 0;

        this.form = this.formBuilder.group({
            points: [points],
            bonusType: [this.bonusType],
        });
    }

    /**
     * Reward user
     * HTTP call
     */
    onSubmit() {
        this.httpService.post('user/' + this.user.id + '/reward',
        this.form.value
        ).subscribe(
            response => {
                this.notificationService.fireSuccess('User rewarded!');
                this.contributorsService.repository.update(User.newInstance(response.data));
            },
            error => console.log('Oops, something went wrong', error)
        );
    }

}
