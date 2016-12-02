import {Component, OnInit} from '@angular/core';
import {User} from "../classes/user";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'xp-open-source',
  template: `
    <div class="open-source">
        <h2>Open source contributions</h2>
        <xp-contributions-status
            *ngIf="shouldSeeStatus()"
            [points]="loggedUser.bonus_points['open_source_contributions']">
        </xp-contributions-status>
        <div *ngIf="shouldSeeForm()">
            <p>You've contributed to a project? Please share it with us</p>
            <p>
                <a href="javascript:;" (click)="showForm()">Click here</a>
            </p>
            <xp-contributions-form
                *ngIf="isVisible"
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
export class OpenSourceComponent implements OnInit {
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
            open_source_contributions: this.loggedUser.attributes.open_source_contributions
        });
        this.isVisible = true;
    }

    shouldSeeForm() {
        return typeof(this.loggedUser.bonus_points['open_source_contributions']) === 'undefined';
    }

    shouldSeeStatus() {
        return typeof(this.loggedUser.bonus_points['open_source_contributions']) !== 'undefined'
    }

}
