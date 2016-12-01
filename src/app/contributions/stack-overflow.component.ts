import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

import {User} from "../classes/user";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'xp-stack-overflow',
    template: `
    <div class="stack-overflow">
        <h2>Stack overflow account</h2>
        <xp-contributions-status
            *ngIf="shouldSeeStatus()"
            [points]="loggedUser.bonus_points['stack_overflow_account']">
        </xp-contributions-status>
        <div *ngIf="shouldSeeForm()">
            <p>Try to earn some points by giving your stack overflow account</p>
            <p>
                <a href="javascript:;" (click)="showForm()">Click here</a>
            </p>
            <xp-contributions-form
                *ngIf="isVisible"
                [form]="form"
                title="Stack Overflow Account"
                inputName="stack_overflow_account"
                (onCancel)="handleCancel($event)"
                (onUserChange)="changeUser($event)">
            </xp-contributions-form>
        </div>
    </div>
    `,
    styles: []
})
export class StackOverflowComponent implements OnInit {
    private isVisible: boolean = false;
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
        this.isVisible = false;
    }

    changeUser(value) {
        this.loggedUser = value;
    }

    showForm() {
        this.form = this.formBuilder.group({
            stack_overflow_account: this.loggedUser.attributes.stack_overflow_account
        });
        this.isVisible = true;
    }

    shouldSeeForm() {
        return typeof(this.loggedUser.bonus_points['stack_overflow_account']) === 'undefined';
    }

    shouldSeeStatus() {
        return typeof(this.loggedUser.bonus_points['stack_overflow_account']) !== 'undefined'
    }
}
