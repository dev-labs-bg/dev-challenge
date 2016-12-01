import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {AuthService} from '../services/auth.service';
import {User} from '../classes/user';

@Component({
  selector: 'xp-contributions',
  template: `
    <h1>Greetings, friend</h1>
    <p>Here you could fill out some interesting information about yourself and earn some experience points while you're at it!</p>
    <p>Each column below represents something that we value highly. Feel free to fill them in and gain some points after the admin validates. :)</p>
    <div [ngSwitch]="selectedForm"
        class="form-group">
        <div class="stack-overflow">
            <h2>Stack overflow account</h2>
            <p>Try to earn some points by giving your stack overflow account</p>
            <p>
                <a href="javascript:;" (click)="showForm('stackOverflow')">Click here</a>
            </p>
            <xp-contributions-form
                *ngSwitchCase="'stackOverflow'"
                [form]="form"
                title="Stack Overflow Account"
                inputName="stack_overflow_account"
                (onCancel)="handleCancel($event)"
                (onUserChange)="changeUser($event)">
            </xp-contributions-form>
        </div>
        <div class="public-activity">
            <h2>Public activity</h2>
            <p>Some public activity info</p>
            <p>
                <a href="javascript:;" (click)="showForm('publicActivity')">Click here</a>
            </p>
            <xp-contributions-form
                *ngSwitchCase="'publicActivity'"
                [form]="form"
                title="Public Activity"
                inputName="public_activity"
                (onCancel)="handleCancel($event)"
                (onUserChange)="changeUser($event)">
            </xp-contributions-form>
        </div>
        <div class="public-activity">
            <h2>Side Project</h2>
            <p>Please share your side projects with us info</p>
            <p>
                <a href="javascript:;" (click)="showForm('sideProject')">Click here</a>
            </p>
            <xp-contributions-form
                *ngSwitchCase="'sideProject'"
                [form]="form"
                title="Side Project"
                inputName="side_project"
                (onCancel)="handleCancel($event)"
                (onUserChange)="changeUser($event)">
            </xp-contributions-form>
        </div>
        <div class="open-source">
            <h2>Open source contributions</h2>
            <p>You've contributed to a project? Please share it with us</p>
            <p>
                <a href="javascript:;" (click)="showForm('openSource')">Click here</a>
            </p>
            <xp-contributions-form
                *ngSwitchCase="'openSource'"
                [form]="form"
                title="Open Source Contributions"
                inputName="open_source_contributions"
                (onCancel)="handleCancel($event)"
                (onUserChange)="changeUser($event)">
            </xp-contributions-form>
        </div>
    </div>
  `,
  styles: []
})
export class ContributionsComponent implements OnInit {
    private selectedForm: string = null;
    private form: FormGroup;
    private loggedUser: User;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.loggedUser = this.authService.getLoggedUser();

        this.form = this.formBuilder.group({
            stack_overflow_account: this.loggedUser.attributes.stack_overflow_account
        });
    }

    showForm(value) {
        switch (value) {
            case 'stackOverflow':
                this.form = this.formBuilder.group({
                    stack_overflow_account: this.loggedUser.attributes.stack_overflow_account
                });
                break;
            case 'publicActivity':
                this.form = this.formBuilder.group({
                    public_activity: this.loggedUser.attributes.public_activity
                });
                break;
            case 'sideProject':
                this.form = this.formBuilder.group({
                    side_project: this.loggedUser.attributes.side_project
                });
                break;
            case 'openSource':
                this.form = this.formBuilder.group({
                    open_source_contributions: this.loggedUser.attributes.open_source_contributions
                });
                break;
        }
        this.selectedForm = value;
    }

    handleCancel() {
        this.selectedForm = null;
    }

    changeUser(value) {
        this.loggedUser = value;
    }

}
