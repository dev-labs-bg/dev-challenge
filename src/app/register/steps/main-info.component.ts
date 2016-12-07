import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'xp-register-main-info',
    template: `
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <div class="form-group">
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
                <div
                    *ngIf="form.controls['email'].hasError('required') &&
                    form.controls['email'].touched"
                    class="alert alert-danger">
                    You must specify an email.
                </div>
            </div>
            <div class="form-group">
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
                <div
                    *ngIf="form.controls['password'].hasError('required') &&
                    form.controls['password'].touched"
                    class="alert alert-danger">
                    You must specify a password
                </div>
            </div>
            <div class="form-group">
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
                    <div
                        *ngIf="form.hasError('required')"
                        class="alert alert-danger">
                        You must confirm your password
                    </div>
                </div>
            </div>
            <div class="form-group">
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
                <div
                    *ngIf="form.controls['first_name'].hasError('required') &&
                    form.controls['first_name'].touched"
                    class="alert alert-danger">
                    You must specify a first name.
                </div>
            </div>
            <div class="form-group">
                <label for="last_name">Last name</label>
                <input
                    type="last_name"
                    name="last_name"
                    class="form-control"
                    id="last_name"
                    formControlName="last_name"
                    placeholder="Last Name"
                    required
                />
                <div
                    *ngIf="form.controls['last_name'].hasError('required') &&
                    form.controls['last_name'].touched"
                    class="alert alert-danger">
                    You must specify a first name.
                </div>
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
    @Output() onSubmit = new EventEmitter();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required],
            'password_confirmation': ['', Validators.required],
            'first_name': ['', Validators.required],
            'last_name': ['', Validators.required]
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
        this.onSubmit.emit(this.form.value);
    }
}
