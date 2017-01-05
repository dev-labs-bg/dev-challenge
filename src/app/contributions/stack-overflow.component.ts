import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

import {User} from "../classes/user";
import {AuthService} from "../core/auth.service";

@Component({
    selector: 'xp-stack-overflow',
    template: `
        <h2>StackOverflow Activity</h2>
        <xp-contributions-status
            *ngIf="shouldSeeStatus()"
            [points]="loggedUser.bonus_points['stack_overflow_account']">
        </xp-contributions-status>
        <div *ngIf="shouldSeeForm()">
            <p>
                Share with us if you've helped any fellow developers
                or contributed with something valuable.<br />
                <strong>Hint</strong>: Try to earn over 100 reputation points.
            </p>
            <p *ngIf="! isFormVisible">
                <button type="button" class="btn btn-primary" (click)="showForm()">
                    Make a submission
                </button>
            </p>
            <xp-contributions-form
                *ngIf="isFormVisible"
                [form]="form"
                title="Stack Overflow Account"
                inputName="stack_overflow_account"
                (onCancel)="handleCancel($event)"
                (onUserChange)="changeUser($event)">
            </xp-contributions-form>
        </div>
    `,
    styles: []
})
export class StackOverflowComponent implements OnInit {
    private isFormVisible: boolean = false;
    private loggedUser: User = null;
    private form: FormGroup;

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
            stack_overflow_account: this.loggedUser.attributes.stack_overflow_account
        });
        this.isFormVisible = true;
    }

    shouldSeeForm() {
        return typeof(this.loggedUser.bonus_points['stack_overflow_account']) === 'undefined';
    }

    shouldSeeStatus() {
        return typeof(this.loggedUser.bonus_points['stack_overflow_account']) !== 'undefined'
    }
}
