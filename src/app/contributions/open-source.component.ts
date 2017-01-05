import {Component, OnInit} from '@angular/core';
import {User} from "../classes/user";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'xp-open-source',
  template: `
    <div class="open-source">
        <h2>Open-Source Contributions</h2>
        <xp-contributions-status
            *ngIf="shouldSeeStatus()"
            [points]="loggedUser.bonus_points['open_source_contributions']">
        </xp-contributions-status>
        <div *ngIf="shouldSeeForm()">
            <p>
                Do you have any open-source contributions?<br />
                Please tell us!
            </p>
            <p *ngIf="! isFormVisible">
                <button type="button" class="btn btn-primary" (click)="showForm()">
                    Make a submission
                </button>
            </p>
            <xp-contributions-form
                *ngIf="isFormVisible"
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
            open_source_contributions: this.loggedUser.attributes.open_source_contributions
        });
        this.isFormVisible = true;
    }

    shouldSeeForm() {
        return typeof(this.loggedUser.bonus_points['open_source_contributions']) === 'undefined';
    }

    shouldSeeStatus() {
        return typeof(this.loggedUser.bonus_points['open_source_contributions']) !== 'undefined'
    }

}
