import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {User} from '../classes/user';
import {AuthService} from '../core/auth.service';
import {HttpService} from "../services/http.service";
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: 'xp-contributions-form',
  template: `
    <div class="panel panel-primary">
        <div class="panel-heading">{{ title }}</div>
        <div class="panel-body">
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <input
                        *ngIf="inputName === 'stack_overflow_account'"
                        type="text"
                        placeholder="Link to your account at stack overflow"
                        formControlName="{{ inputName }}"
                        class="form-control"
                    />
                    <textarea
                        *ngIf="inputName !== 'stack_overflow_account'"
                        cols="30" 
                        rows="7"
                        formControlName="{{ inputName }}"
                        class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <button 
                        class="btn btn-primary"
                        type="submit">
                        Submit
                    </button>
                    <div
                        (click)="cancel()"
                        class="btn btn-default">
                        Cancel
                    </div>
                </div>
            </form>
        </div>
    </div>
  `,
  styles: []
})
export class FormComponent implements OnInit {
    @Input() form: FormGroup;
    @Input() title: string;
    @Input() inputName: string;
    @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onUserChange: EventEmitter<User> = new EventEmitter<User>();

    constructor(
        private authService: AuthService,
        private httpService: HttpService,
        private notificationService: NotificationService,
    ) { }

    ngOnInit() {
        //
    }

    onSubmit() {
        this.httpService.put('user/contributions', this.form.value)
            .subscribe(
                response => {
                    this.authService.setLoggedUser(User.newInstance(response.data));
                    this.onUserChange.emit(this.authService.getLoggedUser());

                    this.onCancel.emit();

                    this.notificationService.fireSuccess(
                        'Thank you for your submission'
                    );
                }
            )
    }

    cancel() {
        this.onCancel.emit();
    }

}
