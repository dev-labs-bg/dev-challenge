import {Component, OnInit} from '@angular/core';
import {User} from "../classes/user";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'xp-public-activity',
  template: `
    <div class="public-activity">
        <h2>Public activity</h2>
        <xp-contributions-status
            *ngIf="shouldSeeStatus()"
            [points]="loggedUser.bonus_points['public_activity']">
        </xp-contributions-status>
        <div *ngIf="shouldSeeForm()">
            <p>Some public activity info</p>
            <p>
                <a href="javascript:;" (click)="showForm()">Click here</a>
            </p>
            <xp-contributions-form
                *ngIf="isVisible"
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
    private isVisible: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.loggedUser = this.authService.getLoggedUser();
    }

    handleCancel() {
        this.isVisible = false;
    }

    changeUser(value) {
        this.loggedUser = value;
    }

    showForm() {
        this.form = this.formBuilder.group({
            public_activity: this.loggedUser.attributes.public_activity
        });
        this.isVisible = true;
    }

    shouldSeeForm() {
        return typeof(this.loggedUser.bonus_points['public_activity']) === 'undefined';
    }

    shouldSeeStatus() {
        return typeof(this.loggedUser.bonus_points['public_activity']) !== 'undefined'
    }

}
