import {Component, OnInit} from '@angular/core';
import {User} from "../classes/user";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../core/auth.service";

@Component({
  selector: 'xp-side-project',
  template: `
    <div class="side-project">
        <h2>Side Project</h2>
        <xp-contributions-status
            *ngIf="shouldSeeStatus()"
            [points]="loggedUser.bonus_points['side_project']">
        </xp-contributions-status>
        <div *ngIf="shouldSeeForm()">
            <p>Please share your side projects with us info</p>
            <p>
                <a href="javascript:;" (click)="showForm()">Click here</a>
            </p>
            <xp-contributions-form
                *ngIf="isVisible"
                [form]="form"
                title="Side Project"
                inputName="side_project"
                (onCancel)="handleCancel($event)"
                (onUserChange)="changeUser($event)">
            </xp-contributions-form>
        </div>
    </div>
  `,
  styles: []
})
export class SideProjectComponent implements OnInit {
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
            side_project: this.loggedUser.attributes.side_project
        });
        this.isVisible = true;
    }

    shouldSeeForm() {
        return typeof(this.loggedUser.bonus_points['side_project']) === 'undefined';
    }

    shouldSeeStatus() {
        return typeof(this.loggedUser.bonus_points['side_project']) !== 'undefined'
    }
}
