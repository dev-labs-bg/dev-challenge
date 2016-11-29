import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import * as _ from 'lodash';

import { User } from '../../classes/user';
import { UserService} from '../../shared/user.service';

@Component({
  selector: 'xp-bonuses',
  template: `
    <h1>Submitted contributions</h1>
    <div *ngFor="let user of users;" 
        class="panel panel-primary">
        <div class="panel-heading">{{ user.getName() }}</div>
        <div class="panel-body">
            <div *ngIf="!! user.attributes.stack_overflow_account">
                <h4>Stack overflow account:</h4>
                <p>
                    <a href="{{ user.attributes.stack_overflow_account }}" target="_blank">
                        Click here to view
                    </a>
                </p>
            </div>
            <div *ngIf="!! user.attributes.public_activity">
                <h4>Public activity</h4>
                <p>
                    {{ user.attributes.public_activity }}
                </p>
            </div>
            <div *ngIf="!! user.attributes.side_project">
                <h4>Side project</h4>
                <p>
                    {{ user.attributes.side_project }}
                </p>
            </div>
            <div *ngIf="!! user.attributes.open_source_contributions">
                <h4>Open Source Contributions</h4>
                <p>
                    {{ user.attributes.open_source_contributions }}
                </p>
            </div>
            <div class="form-group">
                <div
                    (click)="openRewardForm(user)"
                    class="btn btn-primary">
                    Reward
                </div>
            </div>
            <div *ngIf="selectedUser == user">
                <xp-bonus-form
                    (onCancel)="handleCancel($event)"
                    [user]="user">
                </xp-bonus-form>
            </div>
        </div>
    </div>
  `,
  styles: []
})
export class BonusesComponent implements OnInit {
    private users: User[] = [];
    private selectedUser: User = null;

    constructor(
        private userService: UserService,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.userService.repository.getAll(
            this.httpService.get('users/contributors')
        ).subscribe(
            response => this.users = response.data.map(
                el => User.newInstance(el)
            )
        )
    }

    openRewardForm(user) {
        this.selectedUser = user;
    }

    handleCancel($event) {
        this.selectedUser = null;
    }
}
