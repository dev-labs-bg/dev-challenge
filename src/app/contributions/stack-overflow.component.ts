import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

import {User} from '../classes/user';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'xp-stack-overflow',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
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
  `,
  styles: []
})
export class StackOverflowComponent implements OnInit {
    private form: FormGroup;
    private loggedUser: User;
    @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
    ) { }

    ngOnInit() {
        this.loggedUser = this.authService.getLoggedUser();

        this.form = this.formBuilder.group({
            stack_overflow_account: [
                this.loggedUser.attributes.stack_overflow_account
            ],
        });
    }

    onSubmit() {
        console.log(this.form.value);
    }

    cancel() {
        this.onCancel.emit();
    }

}
