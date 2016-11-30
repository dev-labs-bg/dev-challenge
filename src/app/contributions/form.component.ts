import {Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

// 3rd party plugins
import { NotificationService } from '../shared/notification.service';

import { HttpService } from '../services/http.service';
import { User } from '../classes/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'xp-contributions-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="updateInfo()">
        <div class="form-group">
            <label for="stack_overflow_account">Stack overflow account</label>
            <input 
                type="text"
                placeholder="Link to your account at stack overflow"
                id="stack_overflow_account"
                formControlName="stack_overflow_account"
                class="form-control"
            />
        </div>
        <div class="form-group">
            <label for="side_project">Side project: give us link / 
            information about it ( it does <strong>not</strong> have to web based :)</label>
            <textarea 
                name="side_project" 
                id="side_project"
                formControlName="side_project"
                class="form-control"
                cols="30" 
                rows="7"></textarea>
        </div>
        <div class="form-group">
            <label for="public_activity">Public activity</label>
            <textarea 
                name="public_activity" 
                id="public_activity"
                formControlName="public_activity"
                class="form-control"
                cols="30"
                rows="7"></textarea>
        </div>
        <div class="form-group">
            <label for="open_source_contributions">Open Source Contributions - you could share us information about the projects you've contributed to or you could supply us your Github profile.</label>
            <textarea 
                name="open_source_contributions" 
                id="open_source_contributions"
                formControlName="open_source_contributions"
                cols="30" 
                class="form-control"
                rows="7"></textarea>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">
                Send info
            </button>
        </div>
    </form>
  `,
  styles: []
})
export class ContributionsFormComponent implements OnInit {
    private form: FormGroup;
    private loggedUser: User;

    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        private authService: AuthService,
        private notificationService: NotificationService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.loggedUser = this.authService.getLoggedUser();

        // noinspection TypeScriptUnresolvedVariable
        this.form = this.formBuilder.group({
            stack_overflow_account: [
                this.loggedUser.attributes.stack_overflow_account
            ],
            side_project: [
                this.loggedUser.attributes.side_project
            ],
            public_activity: [
                this.loggedUser.attributes.public_activity
            ],
            open_source_contributions: [
                this.loggedUser.attributes.open_source_contributions
            ],
        });
    }

    updateInfo() {
        this.httpService.put('user/contributions', this.form.value)
            .subscribe(
                response => {
                    this.authService.setLoggedUser(response.data);

                    this.notificationService.fireSuccess(
                        'Info updated! You will received your bonuses after admin validation :)'
                    );

                    this.router.navigate(['dashboard']);
                },
                error => console.log('Ah, something went wrong', error)
            );
    }
}
