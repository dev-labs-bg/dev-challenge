import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { HttpService } from '../../services/http.service';

import { GITHUB_ENDPOINT } from '../../config';
import { User } from '../../classes/user';

@Component({
    selector: 'xp-register-main-info',
    template: `
        <p>Можете да се регистрирате чрез Github:</p>
        <p>
            <a
                href="{{ GITHUB_ENDPOINT }}"
                class="btn btn-primary">
                Github registration
            </a>
        </p>
        <p>...или да използвате стандартната форма:</p>
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['email'].valid &&
                    form.controls['email'].touched
                ">
                <label for="email">Email address</label>
                <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="email"
                    formControlName="email"
                    placeholder="Email"
                    required
                />
            </div>
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['password'].valid &&
                    form.controls['password'].touched
                ">
                <label for="password">Password</label>
                <input
                    type="password"
                    name="password"
                    class="form-control"
                    id="password"
                    formControlName="password"
                    placeholder="Password"
                    required
                />
            </div>
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['password_confirmation'].valid &&
                    form.controls['password_confirmation'].touched
                ">
                <label for="password_confirmation">Password</label>
                <input
                    type="password"
                    name="password_confirmation"
                    class="form-control"
                    id="password_confirmation"
                    formControlName="password_confirmation"
                    placeholder="Confirm Password"
                    required
                />
                <div *ngIf="form.controls['password_confirmation'].touched">
                    <div
                        *ngIf="form.hasError('mismatchedPasswords')"
                        class="alert alert-danger">
                        Passwords do not match.
                    </div>
                </div>
            </div>
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['first_name'].valid &&
                    form.controls['first_name'].touched
                ">
                <label for="first_name">First name</label>
                <input
                    type="first_name"
                    name="first_name"
                    class="form-control"
                    id="first_name"
                    formControlName="first_name"
                    placeholder="First Name"
                    required
                />
            </div>
            <div class="form-group"
                [class.has-error]="
                    ! form.controls['last_name'].valid &&
                    form.controls['last_name'].touched
                ">
                <label for="last_name">Last name</label>
                <input
                    type="last_name"
                    name="last_name"
                    class="form-control"
                    id="last_name"
                    formControlName="last_name"
                    placeholder="Last Name"
                />
             </div>
            <button
                type="submit"
                class="btn btn-primary"
                [disabled]="! form.valid">
                Next
            </button>
        </form>
    `
})
export class MainInfoComponent implements OnInit {
    @Input() user: User;
    @Output() onSubmit = new EventEmitter();
    form: FormGroup;
    GITHUB_ENDPOINT: string = GITHUB_ENDPOINT;

    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'email': [this.user.email, Validators.required],
            'password': ['', Validators.required],
            'password_confirmation': ['', Validators.required],
            'first_name': [this.user.first_name, Validators.required],
            'last_name': [this.user.last_name]
        }, {
           validator: this.matchingPasswords('password', 'password_confirmation')
        });
    }

    private matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }

    handleSubmit() {
        this.checkEmail().subscribe(
            response => this.onSubmit.emit(this.form.value),
            error => console.log('Duplicate email', error)
        );
    }

    /**
     * Check if email is taken
     *
     * @return {Observable}
     */
    checkEmail() {
        let email = this.form.controls['email'].value;

        return this.httpService.post('check-email', {email: email});
    }
}
