import {Component, OnInit} from '@angular/core';
import {User} from "../classes/user";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'xp-public-activity',
  template: `
    <div class="public-activity">
        <h2>Public Activity</h2>
        <xp-contributions-status
            *ngIf="shouldSeeStatus()"
            [points]="loggedUser.bonus_points['public_activity']">
        </xp-contributions-status>
        <div *ngIf="shouldSeeForm()">
            <p>
                Did you do any tech presentations or workshops?
                Did you speak on a dev conference or event?<br />
                Share with us and earn bonus experience points!
            </p>
            <p *ngIf="! isFormVisible">
                <button type="button" class="btn btn-primary" (click)="showForm()">
                    Make a submission
                </button>
            </p>
            <xp-contributions-form
                *ngIf="isFormVisible"
                [form]="form"
                title="Public Activity"
                inputName="public_activity"
                (onCancel)="handleCancel($event)"
                (onUserChange)="changeUser($event)">
            </xp-contributions-form>
        </div>
    </div>
  `,
  styles: []
})
export class PublicActivityComponent implements OnInit {
    private loggedUser: User = null;
    private form: FormGroup;
    private isFormVisible: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.loggedUser = this.authService.getLoggedUser();
    }

    handleCancel() {
        this.isFormVisible = false;
    }

    changeUser(value) {
        this.loggedUser = value;
    }

    showForm() {
        this.form = this.formBuilder.group({
            public_activity: this.loggedUser.attributes.public_activity
        });
        this.isFormVisible = true;
    }

    shouldSeeForm() {
        return typeof(this.loggedUser.bonus_points['public_activity']) === 'undefined';
    }

    shouldSeeStatus() {
        return typeof(this.loggedUser.bonus_points['public_activity']) !== 'undefined'
    }

}
