import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

// 3rd party plugins
import {NotificationService} from "../../shared/notification.service";

import {User} from '../../classes/user';
import {HttpService} from '../../services/http.service';
import {ContributorsService} from "../../contributions/contributors.service";
import {UserService} from "../../shared/user.service";

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
            <div
                (click)="cancel()"
                class="btn btn-default">
                Cancel
            </div>
        </div>
    </form>
  `,
  styles: []
})
export class BonusFormComponent implements OnInit {
    @Input() user: User;
    @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    private form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        private notificationService: NotificationService,
        private contributorsService: ContributorsService,
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            points: [this.user.bonus_points]
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
                this.cancel();
                this.contributorsService.repository.update(User.newInstance(response.data));
            },
            error => console.log('Oops, something went wrong', error)
        );
    }

    cancel() {
        this.onCancel.emit();
    }

}
